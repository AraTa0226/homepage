const fs = require('fs');
let content = fs.readFileSync('src/contexts/PriceContext.tsx', 'utf8');
let lines = content.split(/\r?\n/);

let replacement = `            { title: "再生アプリ・設定", description: "ハイレゾ再生に特化したアプリの導入と設定", icon: "Settings" }
          ],
          notes: [
            "ハイレゾ音源（FLAC/WAV/DSD等）の準備が必要です。",
            "システム構成により、別途D/Aコンバーター等が必要になる場合があります。",
            "ワイヤレス（Bluetooth）でのハイレゾ再生には、LDAC等の対応機器が必要です。"
          ]
        },
        lineup: [
          { 
            name: "プランF：Bluetoothレシーバー導入", 
            price: "0", 
            description: "ワイヤレスながら96k/24bitのハイレゾ伝送を実現。利便性と音質を両立。",
            image: "https://picsum.photos/seed/hires-f/400/300"
          },
          {
            name: "プランG：メディアプレーヤー導入",
            price: "0",
            description: "大容量SSD等に対応した専用機。究極を求めるユーザーに人気。ライブラリーを丸ごと持ち歩けます。",
            image: "https://picsum.photos/seed/hires-g/400/300"
          }
        ]
      }
    ]
  },`;

// Replace lines 798 to 813 (16 lines). Line 798 is 0-indexed line 799.
lines.splice(798, 16, replacement);

fs.writeFileSync('src/contexts/PriceContext.tsx', lines.join('\n'), 'utf8');
console.log('Fixed file.');
