import {TreeNode} from "primeng/components/common/api";

export const IsKalemleriList:TreeNode[]=

  [
    {
      "data":{
        "SıraNo":"1",
        "İş Kalemi No":"EKOS-CTP-6-600",
        "Açıklama":"600 mm Anma çapında 6 Atm CTP...",
        "İşin Çeşidi":"",
        "Meslek Grubu":"",
        "Birimi":"metre",
        "Miktarı":"0.012"
      },
      "children":[
        {
          "data":{
            "Açıklama":"Temin",
            "Oran(%)":"40",
            "İşin Çeşidi":"Büro İşi",
            "Meslek Grubu":"yok"
          },

        },
        {
          "data":{
            "Alt İş Kalemi":"Döşeme",
            "Oran(%)":"50",
            "İşin Çeşidi":"İnşaat İşi",
            "Meslek Grubu":"İnşaat Mühendisi"
          },
        }
      ]
    },

  ]
