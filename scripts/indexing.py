import json
import os
from pathlib import Path

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account


SITE_URL = "https://progzt-aetheric.github.io/"
SCOPES = ["https://www.googleapis.com/auth/indexing"]
DEFAULT_CREDENTIALS_FILE = Path(__file__).with_name("google_credentials.json")


def load_credentials():
    credentials_json = os.environ.get("GOOGLE_INDEXING_CREDENTIALS_JSON")
    if credentials_json:
        try:
            service_account_info = json.loads(credentials_json)
        except json.JSONDecodeError as error:
            raise ValueError(
                "GOOGLE_INDEXING_CREDENTIALS_JSON must contain valid service-account JSON."
            ) from error
    else:
        credentials_file = Path(
            os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", DEFAULT_CREDENTIALS_FILE)
        )
        if not credentials_file.is_file():
            raise FileNotFoundError(
                "Set GOOGLE_INDEXING_CREDENTIALS_JSON or provide a local "
                "scripts/google_credentials.json file."
            )
        with credentials_file.open(encoding="utf-8") as file:
            service_account_info = json.load(file)

    return service_account.Credentials.from_service_account_info(
        service_account_info, scopes=SCOPES
    )


def main():
    credentials = load_credentials()
    try:
        response = (
            build("indexing", "v3", credentials=credentials, cache_discovery=False)
            .urlNotifications()
            .publish(body={"url": SITE_URL, "type": "URL_UPDATED"})
            .execute()
        )
    except HttpError as error:
        raise RuntimeError(
            "Google Indexing API rejected the URL update request. Check that the "
            "Indexing API is enabled, the service account has access to the site, "
            "and the URL is eligible for this API."
        ) from error

    print(f"Successfully submitted URL update notification for {SITE_URL}.")
    print("Google Indexing API response metadata:")
    print(json.dumps(response, ensure_ascii=False, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
