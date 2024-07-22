const cognito_token_url_response =
  "http://localhost:3000/login#id_token=eyJraWQiOiJoK2VzNlNVNUVzQmhuTFJjdnpnckxFbk80UlRsQVQ2NWxuNFczQ2JpemhJPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiVWMwanZ4LUhVTWFYRXIzZXVMc1ZWZyIsInN1YiI6ImQ0NTgzNDE4LTMwYjEtNzA0Yi0yMzM4LTQ2YmYyODhkOTc3MiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9UWTdIczRxUGUiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJjb2duaXRvOnVzZXJuYW1lIjoiZDQ1ODM0MTgtMzBiMS03MDRiLTIzMzgtNDZiZjI4OGQ5NzcyIiwiYXVkIjoiMmRvcmR1OGpnbTg3NDUwaTRvcm51azRxaDMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5NTIzNjE0NSwicGhvbmVfbnVtYmVyIjoiKzE2MTM4NjI4Mjk4IiwiZXhwIjoxNjk1MjM5NzQ1LCJpYXQiOjE2OTUyMzYxNDUsImp0aSI6IjdjMjExM2ExLTJhZTYtNGQyOC1iMzljLTFiOGEyZWY3MGIxNiIsImVtYWlsIjoic3RlcGhlbl93aGVlbGVyQHlhaG9vLmNvbSJ9.P9D034gmWNtdjvuUWxelYPdqH_SCGM2teKFzRNX-3kDqW03CnxopLYRLqWlrLa8m8J7aUTE9jCryTeL6OUTCkzwMpPnbiqL_lQAP64q6h-n2ldeigWD7NT17v3qe7Fq3gP_MKLZErDJVc-bXRjPQotkn0GmyVtHIKdH_3ShEYIztCSejIhNlpajIE37HbGeu8PwNC1cEWeY-m_nTF9Ri_bkkFcxvdeiY1DkQRqv2oADQtEbJ5mAn96vBww4MLzHNjULTE9rRXq5vuIYV8glomssk07xwRQJKad97rHMSDgcamKdLB4hfIMvLeSxKMjOAPKD6jmDHVl9TT4ThZKVUGA&access_token=eyJraWQiOiJWaW9GSjQ3SzVpZEg4dXF3cVFIMVhTZWNvVmluZDNEZzZCVGlUeWY0RWpBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNDU4MzQxOC0zMGIxLTcwNGItMjMzOC00NmJmMjg4ZDk3NzIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY5NTIzNjE0NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfVFk3SHM0cVBlIiwiZXhwIjoxNjk1MjM5NzQ1LCJpYXQiOjE2OTUyMzYxNDUsInZlcnNpb24iOjIsImp0aSI6ImVkZGRmM2RhLTZhNTItNDQxNy05MjY3LTUwYWU1ZDQyZjgzNCIsImNsaWVudF9pZCI6IjJkb3JkdThqZ204NzQ1MGk0b3JudWs0cWgzIiwidXNlcm5hbWUiOiJkNDU4MzQxOC0zMGIxLTcwNGItMjMzOC00NmJmMjg4ZDk3NzIifQ.F0B7-VpsCBK_v-b-CNkH6eMzGPIpF9bShKSSWcTOiTbTIGFyxZRvl2zSPm0Rqe6fPWIm2NvCFVKakJuuuIHLPpqzD6I26bE6k_uue8Zlunz3TZcjwX9uEsG1xJR8juHAWsmuAIZBB8J9d4ce4NcptcB_KNzG_ohLP2AUR0tCrdfOKupepgnqFWKS2f3ZLhAiy3n1d10KCgDTTJso6wNRkWjNKYx_8ykg_3MVhGYDnBHL1OLGZNjbXzz37qTPxRMfid4ciPXYMua9u-EcpakjdiarxEfZBI2t1e4KtZTmnMkqUzGpXSaqU-0m3UNRWM8ngR7njdAcAolo7ErPXaEBQg&expires_in=3600&token_type=Bearer";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import Page from "./page";

describe("Login Page", () => {
  var user_data = [
    {
        "id": "4a014860-ff12-4406-a4ef-57eb58bcf153",
        "resident_id": "asdfadfag",
        "first_name": "Stephen",
        "middle_name": "",
        "last_name": "Wheeler",
        "ssn_number": "asdfadsf",
        "address": "8 Allan Place",
        "city": "Ottawa",
        "state": "ON",
        "postalcode": "K1S 3T1",
        "province": "Canada",
        "country": "Canada",
        "tel_number": "6138628298",
        "id_number": "asdfads",
        "id_sate": "ON",
        "house_size": "5",
        "race": {
            "option": "Europe or North Africa",
            "group": "White"
        },
        "ethnicity": {
            "option": "Hispanic",
            "group": "Hispanic"
        },
        "date_of_birth": "2023-12-07T21:13:16.899Z",
        "relationship": {
            "value": "co_head",
            "label": "Co-Head"
        },
        "disable": {
            "value": "no",
            "label": "No"
        },
        "student_status": {
            "value": "full time",
            "label": "Full-Time"
        },
        "email": "stephen_wheeler@yahoo.com",
        "role": "property_manager",
        "property_manager_id": "d4583418-30b1-704b-2338-46bf288d9772",
        "_rid": "vz0iALwiUtCGAwAAAAAAAA==",
        "_self": "dbs/vz0iAA==/colls/vz0iALwiUtA=/docs/vz0iALwiUtCGAwAAAAAAAA==/",
        "_etag": "\"7c008f4e-0000-0100-0000-65b802290000\"",
        "_attachments": "attachments/",
        "_ts": 1706557993
    }
]

  it("renders the Login Page ", () => {
    render(<Page />);
  });

  it("Verify the snapshot of the Login Component is matched", () => {
    const wrap = create(<Page />).toJSON();
    expect(wrap).toMatchSnapshot();
  });

 
});
