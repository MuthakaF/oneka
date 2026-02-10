from .scraper import fetch_tender_json
from .parser import parse_tender_list

START_DATE = "2023-01-01"
END_DATE = "2024-12-31"
MAX_PAGES = 60

def run():
    all_tenders = []

    for page in range(50, MAX_PAGES + 1):
        print(f"Fetching page {page}...")
        try:
            tenders = fetch_tender_json(
                page=page,
                start_date=START_DATE,
                end_date=END_DATE
            )
            parsed_tenders = parse_tender_list(tenders)
            all_tenders.extend(parsed_tenders)
        except Exception as e:
            print(f"Error fetching page {page}: {e}")

    print(f"\nFetched {len(all_tenders)} tenders")

    # ---- SHOW FIRST 5 ----
    print("\n=== SAMPLE TENDERS (FIRST 5) ===\n")
    for i, tender in enumerate(all_tenders[:5], start=1):
        # safe fallback if some fields are missing
        print(f"Tender {i}")
        print(f"Title       : {tender.get('title', '')}")
        print(f"Reference   : {tender.get('tender_ref', '')}")
        print(f"Entity      : {tender.get('pe_name', '')}")
        print(f"Category    : {tender.get('procurementCategory', '')}")
        print(f"Method      : {tender.get('procurementMethod', '')}")
        print(f"Published   : {tender.get('published_at', '')}")
        print(f"Close Date  : {tender.get('close_at', '')}")
        print("-" * 60)

    return all_tenders

if __name__ == "__main__":
    run()
