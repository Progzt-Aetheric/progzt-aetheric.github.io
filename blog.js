import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const OWNER_EMAIL = "progzt9@gmail.com";
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='20' fill='%23222b3b'/%3E%3Ccircle cx='20' cy='15' r='7' fill='%23808da3'/%3E%3Cpath d='M7 38c1-9 6-13 13-13s12 4 13 13' fill='%23808da3'/%3E%3C/svg%3E";
const firebaseConfig = window.PROGZT_FIREBASE_CONFIG;

const elements = {
    signIn: document.querySelector("#signInButton"),
    signOut: document.querySelector("#signOutButton"),
    signInPanel: document.querySelector("#communitySignin"),
    userPanel: document.querySelector("#communityUser"),
    userAvatar: document.querySelector("#communityAvatar"),
    userName: document.querySelector("#communityUserName"),
    userBadge: document.querySelector("#communityUserBadge"),
    userRole: document.querySelector("#communityUserRole"),
    editProfile: document.querySelector("#editProfileButton"),
    onboardingDialog: document.querySelector("#onboardingDialog"),
    onboardingForm: document.querySelector("#onboardingForm"),
    onboardingUsername: document.querySelector("#onboardingUsername"),
    onboardingAvatarUrl: document.querySelector("#onboardingAvatarUrl"),
    onboardingError: document.querySelector("#onboardingError"),
    onboardingSubmit: document.querySelector("#onboardingSubmit"),
    profileDialog: document.querySelector("#profileDialog"),
    profileForm: document.querySelector("#profileForm"),
    profileUsername: document.querySelector("#profileUsername"),
    profileAvatarUrl: document.querySelector("#profileAvatarUrl"),
    profileError: document.querySelector("#profileError"),
    profileSubmit: document.querySelector("#profileSubmit"),
    closeProfile: document.querySelector("#closeProfileButton"),
    form: document.querySelector("#postForm"),
    postTitle: document.querySelector("#postTitle"),
    postExcerpt: document.querySelector("#postExcerpt"),
    postContent: document.querySelector("#postContent"),
    postCoverImage: document.querySelector("#postCoverImage"),
    publish: document.querySelector("#publishButton"),
    status: document.querySelector("#communityStatus"),
    feed: document.querySelector("#communityPosts")
};

let auth;
let db;
let currentUser = null;
let currentProfile = null;
let postUnsubscribe = null;

function isOwner(user = currentUser) {
    return user?.emailVerified === true && user.email?.toLowerCase() === OWNER_EMAIL;
}

function isVerified(user = currentUser, profile = currentProfile) {
    return user?.email?.toLowerCase() === OWNER_EMAIL || profile?.isVerified === true;
}

function text(ar, en) {
    return document.documentElement.lang === "en" ? en : ar;
}

function setStatus(message = "", kind = "") {
    elements.status.textContent = message;
    if (kind) {
        elements.status.dataset.kind = kind;
    } else {
        delete elements.status.dataset.kind;
    }
}

function errorMessage(error) {
    console.error("Blog operation failed:", error);
    const messages = {
        "auth/popup-closed-by-user": text("تم إغلاق نافذة تسجيل الدخول قبل اكتمالها.", "The sign-in window was closed before completion."),
        "auth/popup-blocked": text("حظر المتصفح نافذة تسجيل الدخول. اسمح بالنوافذ المنبثقة ثم أعد المحاولة.", "The browser blocked the sign-in popup. Allow popups and try again."),
        "auth/unauthorized-domain": text("أضف نطاق الموقع إلى النطاقات المصرح بها في Firebase Authentication.", "Add this site domain to Firebase Authentication's authorized domains."),
        "permission-denied": text("رفضت قواعد Firebase هذا الإجراء. تحقق من نشر قواعد Firestore.", "Firebase rules rejected this action. Check that the Firestore rules are deployed.")
    };
    return messages[error?.code] || text("تعذر إكمال العملية. تحقق من إعدادات Firebase واتصال الإنترنت ثم أعد المحاولة.", "The operation failed. Check Firebase setup and your internet connection, then try again.");
}

function validImageUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
}

function makeAvatar(photoUrl, className = "community-avatar") {
    const image = document.createElement("img");
    image.className = className;
    image.src = photoUrl || DEFAULT_AVATAR;
    image.alt = "";
    image.width = className === "community-avatar" ? 36 : 42;
    image.height = image.width;
    image.referrerPolicy = "no-referrer";
    image.addEventListener("error", () => {
        image.src = DEFAULT_AVATAR;
    }, { once: true });
    return image;
}

function verifiedBadge() {
    const badge = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    badge.classList.add("community-verified");
    badge.setAttribute("viewBox", "0 0 24 24");
    badge.setAttribute("role", "img");
    badge.setAttribute("aria-label", text("حساب موثّق", "Verified account"));
    badge.setAttribute("title", text("حساب موثّق", "Verified account"));
    const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    shape.setAttribute("fill", "#2388ff");
    shape.setAttribute("d", "M12 1.5l2 2.2 2.9-.5 1.2 2.7 2.8 1.1-.4 3 2 2-2 2 .4 3-2.8 1.1-1.2 2.7-2.9-.5-2 2.2-2-2.2-2.9.5-1.2-2.7-2.8-1.1.4-3-2-2 2-2-.4-3 2.8-1.1 1.2-2.7 2.9.5z");
    const check = document.createElementNS("http://www.w3.org/2000/svg", "path");
    check.setAttribute("fill", "none");
    check.setAttribute("stroke", "#fff");
    check.setAttribute("stroke-linecap", "round");
    check.setAttribute("stroke-linejoin", "round");
    check.setAttribute("stroke-width", "2");
    check.setAttribute("d", "m7.8 12.2 2.7 2.7 5.8-5.8");
    badge.append(shape, check);
    return badge;
}

function addBadgeIfVerified(container, verified) {
    container.replaceChildren();
    if (verified) {
        container.append(verifiedBadge());
    }
}

function formatDate(timestamp) {
    if (!timestamp?.toDate) {
        return text("الآن", "Just now");
    }
    return new Intl.DateTimeFormat(document.documentElement.lang === "en" ? "en" : "ar", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(timestamp.toDate());
}

function renderPosts(snapshot) {
    const fragment = document.createDocumentFragment();
    if (snapshot.empty) {
        const empty = document.createElement("div");
        empty.className = "community-empty";
        empty.textContent = text("لا توجد مقالات بعد.", "No articles published yet.");
        fragment.append(empty);
    }

    snapshot.docs.forEach(item => {
        const post = { id: item.id, ...item.data() };
        const card = document.createElement("article");
        card.className = "community-post";
        const image = document.createElement("img");
        image.className = "community-post-image";
        image.src = post.coverImageUrl;
        image.alt = "";
        image.loading = "lazy";
        image.referrerPolicy = "no-referrer";
        image.addEventListener("error", () => image.remove(), { once: true });

        const content = document.createElement("div");
        content.className = "community-post-content";
        const meta = document.createElement("div");
        meta.className = "community-post-author";
        meta.append(makeAvatar(post.authorAvatarUrl));
        const authorDetails = document.createElement("div");
        authorDetails.className = "community-post-author-details";
        const authorName = document.createElement("strong");
        authorName.textContent = post.authorName || text("Progzt Aetheric", "Progzt Aetheric");
        if (post.authorVerified) {
            authorName.append(verifiedBadge());
        }
        const time = document.createElement("time");
        time.dateTime = post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : "";
        time.textContent = formatDate(post.createdAt);
        authorDetails.append(authorName, time);
        meta.append(authorDetails);

        const title = document.createElement("h3");
        title.textContent = post.title || "";
        const excerpt = document.createElement("p");
        excerpt.className = "community-post-excerpt";
        excerpt.textContent = post.excerpt || "";
        const body = document.createElement("p");
        body.className = "community-post-text";
        body.textContent = post.content || "";
        content.append(meta, title, excerpt, body);
        card.append(image, content);

        if (isOwner()) {
            const actions = document.createElement("div");
            actions.className = "community-post-actions";
            actions.append(actionButton(text("حذف المقال", "Delete article"), () => removePost(post.id), "community-button community-button-quiet community-delete"));
            content.append(actions);
        }
        fragment.append(card);
    });

    elements.feed.replaceChildren(fragment);
    elements.feed.setAttribute("aria-busy", "false");
}

function actionButton(label, callback, className) {
    const button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", callback);
    return button;
}

function startPostFeed() {
    postUnsubscribe?.();
    elements.feed.setAttribute("aria-busy", "true");
    elements.feed.replaceChildren(Object.assign(document.createElement("p"), {
        className: "community-loading",
        textContent: text("جارٍ تحميل المقالات...", "Loading articles...")
    }));
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(50));
    postUnsubscribe = onSnapshot(postsQuery, snapshot => renderPosts(snapshot), error => {
        elements.feed.setAttribute("aria-busy", "false");
        setStatus(errorMessage(error), "error");
        elements.feed.replaceChildren();
    });
}

async function removePost(postId) {
    if (!isOwner() || !window.confirm(text("هل تريد حذف هذا المقال؟", "Delete this article?"))) {
        return;
    }
    try {
        await deleteDoc(doc(db, "posts", postId));
        setStatus(text("تم حذف المقال.", "Article deleted."), "success");
    } catch (error) {
        setStatus(errorMessage(error), "error");
    }
}

function applyProfile(profile) {
    currentProfile = profile;
    if (!profile) {
        return;
    }
    elements.userAvatar.src = profile.avatarUrl;
    elements.userAvatar.referrerPolicy = "no-referrer";
    elements.userAvatar.onerror = () => {
        elements.userAvatar.src = DEFAULT_AVATAR;
    };
    elements.userName.textContent = profile.username;
    addBadgeIfVerified(elements.userBadge, isVerified());
    elements.userRole.textContent = isOwner() ? text("المالك", "Owner") : text("عضو", "Member");
    elements.userPanel.hidden = false;
}

function showProfileDialog(dialog) {
    if (!dialog.open) {
        dialog.showModal();
    }
}

async function saveProfile(username, avatarUrl, { onboarding, submit, errorElement }) {
    const cleanUsername = username.trim();
    const cleanAvatarUrl = avatarUrl.trim();
    if (cleanUsername.length < 2 || cleanUsername.length > 40 || !validImageUrl(cleanAvatarUrl)) {
        errorElement.textContent = text("أدخل اسماً من حرفين إلى 40 حرفاً ورابط صورة صالحاً يبدأ بـ http أو https.", "Enter a 2–40 character username and a valid image URL beginning with http or https.");
        return;
    }

    submit.disabled = true;
    errorElement.textContent = "";
    try {
        const profileRef = doc(db, "users", currentUser.uid);
        const profileData = {
            username: cleanUsername,
            avatarUrl: cleanAvatarUrl,
            updatedAt: serverTimestamp()
        };
        if (onboarding && !currentProfile) {
            await setDoc(profileRef, {
                ...profileData,
                uid: currentUser.uid,
                email: currentUser.email || "",
                isVerified: false,
                createdAt: serverTimestamp()
            });
        } else {
            await updateDoc(profileRef, profileData);
        }
        const snapshot = await getDoc(profileRef);
        if (auth.currentUser?.uid !== profileRef.id) {
            return;
        }
        applyProfile(snapshot.data());
        elements.userPanel.hidden = false;
        elements.signInPanel.hidden = true;
        elements.form.hidden = !isOwner();
        (onboarding ? elements.onboardingDialog : elements.profileDialog).close();
        setStatus(text("تم حفظ ملفك الشخصي.", "Your profile was saved."), "success");
    } catch (error) {
        errorElement.textContent = errorMessage(error);
    } finally {
        submit.disabled = false;
    }
}

elements.signIn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    elements.signIn.disabled = true;
    setStatus("");
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        setStatus(errorMessage(error), "error");
    } finally {
        elements.signIn.disabled = false;
    }
});

elements.signOut.addEventListener("click", async () => {
    try {
        await signOut(auth);
        setStatus(text("تم تسجيل الخروج.", "You have signed out."), "success");
    } catch (error) {
        setStatus(errorMessage(error), "error");
    }
});

elements.editProfile.addEventListener("click", () => {
    if (!currentProfile) {
        return;
    }
    elements.profileUsername.value = currentProfile.username;
    elements.profileAvatarUrl.value = currentProfile.avatarUrl;
    elements.profileError.textContent = "";
    showProfileDialog(elements.profileDialog);
});

elements.closeProfile.addEventListener("click", () => elements.profileDialog.close());
elements.profileDialog.addEventListener("click", event => {
    if (event.target === elements.profileDialog) {
        elements.profileDialog.close();
    }
});
elements.onboardingDialog.addEventListener("cancel", event => event.preventDefault());

elements.onboardingForm.addEventListener("submit", event => {
    event.preventDefault();
    saveProfile(elements.onboardingUsername.value, elements.onboardingAvatarUrl.value, {
        onboarding: true,
        submit: elements.onboardingSubmit,
        errorElement: elements.onboardingError
    });
});

elements.profileForm.addEventListener("submit", event => {
    event.preventDefault();
    saveProfile(elements.profileUsername.value, elements.profileAvatarUrl.value, {
        onboarding: false,
        submit: elements.profileSubmit,
        errorElement: elements.profileError
    });
});

elements.form.addEventListener("submit", async event => {
    event.preventDefault();
    const title = elements.postTitle.value.trim();
    const excerpt = elements.postExcerpt.value.trim();
    const content = elements.postContent.value.trim();
    const coverImageUrl = elements.postCoverImage.value.trim();
    if (!isOwner() || !title || !excerpt || !content || !validImageUrl(coverImageUrl)) {
        setStatus(text("أكمل جميع الحقول وأدخل رابط صورة صالحاً يبدأ بـ http أو https.", "Complete every field and enter a valid image URL beginning with http or https."), "error");
        return;
    }

    elements.publish.disabled = true;
    try {
        await addDoc(collection(db, "posts"), {
            title,
            excerpt,
            content,
            coverImageUrl,
            authorId: currentUser.uid,
            authorName: currentProfile.username,
            authorAvatarUrl: currentProfile.avatarUrl,
            authorVerified: isVerified(),
            createdAt: serverTimestamp()
        });
        elements.form.reset();
        setStatus(text("تم نشر المقال.", "Article published."), "success");
    } catch (error) {
        setStatus(errorMessage(error), "error");
    } finally {
        elements.publish.disabled = false;
    }
});

window.addEventListener("progzt-language-change", () => {
    if (currentUser) {
        elements.userRole.textContent = isOwner() ? text("المالك", "Owner") : text("عضو", "Member");
        addBadgeIfVerified(elements.userBadge, isVerified());
    }
    if (db) {
        startPostFeed();
    }
});

if (!firebaseConfig || Object.values(firebaseConfig).some(value => !value || value.startsWith("YOUR_"))) {
    elements.feed.setAttribute("aria-busy", "false");
    elements.feed.replaceChildren();
    setStatus(text("لم يتم إعداد Firebase بعد. أضف بيانات مشروعك في firebase-config.js ثم اتبع خطوات الإعداد في README.", "Firebase is not configured yet. Add your project settings to firebase-config.js and follow the setup steps in README."), "error");
} else {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    startPostFeed();

    onAuthStateChanged(auth, async user => {
        currentUser = user;
        currentProfile = null;
        elements.signInPanel.hidden = Boolean(user);
        elements.userPanel.hidden = true;
        elements.form.hidden = true;
        if (!user) {
            if (elements.onboardingDialog.open) {
                elements.onboardingDialog.close();
            }
            if (elements.profileDialog.open) {
                elements.profileDialog.close();
            }
            startPostFeed();
            return;
        }

        try {
            const profileSnapshot = await getDoc(doc(db, "users", user.uid));
            if (auth.currentUser?.uid !== user.uid) {
                return;
            }
            const profile = profileSnapshot.exists() ? profileSnapshot.data() : null;
            currentProfile = profile;
            if (!profile?.username?.trim() || !validImageUrl(profile?.avatarUrl || "")) {
                elements.onboardingUsername.value = profile?.username || user.displayName || "";
                elements.onboardingAvatarUrl.value = profile?.avatarUrl || "";
                elements.onboardingError.textContent = "";
                showProfileDialog(elements.onboardingDialog);
                elements.userPanel.hidden = true;
                elements.signInPanel.hidden = true;
                elements.form.hidden = true;
            } else {
                applyProfile(profile);
                elements.form.hidden = !isOwner(user);
            }
            setStatus("");
        } catch (error) {
            if (auth.currentUser?.uid === user.uid) {
                setStatus(errorMessage(error), "error");
            }
        }
        if (auth.currentUser?.uid === user.uid) {
            startPostFeed();
        }
    });
}
