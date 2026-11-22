import urllib.request
import json
import sys

WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw9Tgu6HZfVz0-HWLOJ-c8oRysY515Oi5sLWaLvuoQCUYg17QtW2wmCtiRi7s_AbP__HA/exec'

def mark_reports_done(report_ids, status="DONE / REPAIRED", note="اصلاح کاتالوگ در products.csv انجام و در سامانه منتشر شد"):
    payload = {
        "action": "UPDATE_STATUS",
        "report_ids": report_ids if isinstance(report_ids, list) else [report_ids],
        "new_status": status,
        "note": note
    }

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(WEBHOOK_URL, data=data, headers={'Content-Type': 'text/plain;charset=utf-8'}, method='POST')

    print(f"Sending status update request for {len(payload['report_ids'])} report(s)...")
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            res_json = json.loads(resp.read().decode('utf-8'))
            print("Response:", json.dumps(res_json, ensure_ascii=False, indent=2))
            return res_json
    except Exception as e:
        print("Error updating status:", e)
        return None

if __name__ == '__main__':
    # 4 Real User Reports that were applied in the previous turn
    applied_report_ids = [
        "REP-1795348505356-975",  # خامه حیوانی 33% -> پایه آبی
        "REP-1795351744790-1533", # بستنی قیفی ویفری وانیلی سوربن -> اقتصادی بستنی
        "REP-1795351765757-1592", # بستنی قیفی ویفری شکلاتی سوربن -> اقتصادی بستنی
        "REP-1795351800281-180"   # پودر کاکائو 1 کیلوگرمی سوربن -> شکلات قنادی
    ]

    args = sys.argv[1:]
    ids_to_update = args if args else applied_report_ids

    mark_reports_done(ids_to_update)
