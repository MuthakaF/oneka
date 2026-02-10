def parse_tender_list(tenders):
    """
    Ensure all tenders are dicts and normalize fields
    """
    parsed = []
    for t in tenders:
        parsed.append({
            "title": t.get("title") or "",
            "tender_ref": t.get("tender_ref") or "",
            "pe_name": t.get("pe_name") or "",
            "procurementCategory": t.get("procurementCategory") or "",
            "procurementMethod": t.get("procurementMethod") or "",
            "published_at": t.get("published_at") or "",
            "close_at": t.get("close_at") or ""
        })
    return parsed
