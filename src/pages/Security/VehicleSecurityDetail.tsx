import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePrices } from '../../contexts/PriceContext';
import {
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
    Lock,
    Zap,
    ChevronRight,
    ArrowLeft,
    MessageSquare,
    Check,
    HardDrive,
    Eye,
    HelpCircle,
    Monitor,
    Award
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

interface VehicleSecurityDetailProps {
    assets: any;
}

const VehicleSecurityDetail: React.FC<VehicleSecurityDetailProps> = ({ assets }) => {
    const { modelId } = useParams();
    const navigate = useNavigate();
    const { plans } = usePrices();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [modelId]);

    const [filter, setFilter] = React.useState('all');

    // 汎用ベースプラン（他車種・相談用）
    const basePlans = [
        {
            id: 1,
            brand: 'Grgo',
            grade: 'ZVT II',
            price: '336,600',
            priceTax: '370,260',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 2,
            brand: 'Grgo',
            grade: 'ZVT II + マイクロ波',
            isRecommended: true,
            price: '388,600',
            priceTax: '427,460',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 3,
            brand: 'Panthera',
            grade: 'Z106',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 4,
            brand: 'Panthera',
            grade: 'Z106 + マイクロ波',
            price: '426,800',
            priceTax: '469,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 5,
            brand: 'Panthera',
            grade: 'Z306',
            price: '396,800',
            priceTax: '436,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 6,
            brand: 'Panthera',
            grade: 'Z306 + マイクロ波',
            isRecommended: true,
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 7,
            brand: 'Panthera',
            grade: 'Z706',
            price: '486,800',
            priceTax: '535,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // 車種別設定データ
    const rxPlans = [
        {
            id: 'rx-grgo-zv-full',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: '純正ロック連動とトリプルセンサーを含むANG推奨パッケージ。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'rx-grgo-zvt-full',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '傾斜センサーとCANガード。1WAYリモコンも付属した上位モデル。',
            price: '336,600',
            priceTax: '370,260',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'rx-panthera-z106-plus',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの高精度な検知能力を最大限に活かしたフルガード。',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'rx-panthera-z306-standard',
            brand: 'Panthera',
            grade: 'Z306',
            description: '基本的な車両監視を網羅。後からオプション追加も可能です。',
            price: '360,800',
            priceTax: '396,880',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'rx-panthera-z306-canguard',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: 'Z306の多機能にデジタル対策のCANガードを完全統合。',
            price: '396,800',
            priceTax: '436,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'rx-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: '接近検知を追加し、愛車へのうろつきも許さない最強布陣。',
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'rx-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'あらゆる手口から車を守る、ANGノウハウの結晶プラン。',
            price: '486,800',
            priceTax: '535,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // NX専用設定データ（構成はRXと同じだが価格が異なる）
    const nxPlans = [
        {
            id: 'nx-grgo-zv-full',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: '純正ロック連動とトリプルセンサー。NXオーナーに一番支持される構成。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'nx-grgo-zvt-full',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '傾斜センサーとCANガード、1WAYリモコン。安心をワンランク上げるプラン。',
            price: '331,600',
            priceTax: '364,760',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'nx-panthera-z106-plus',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの高度な検知能力と操作性を追求したパッケージ。',
            price: '369,800',
            priceTax: '406,780',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'nx-panthera-z306-standard',
            brand: 'Panthera',
            grade: 'Z306',
            description: '充実のセンサー構成。車両の安全をバランスよく監視します。',
            price: '360,800',
            priceTax: '396,880',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'nx-panthera-z306-canguard',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '全方位監視とCANインベーダー対策を完全に両立させたプラン。',
            price: '391,800',
            priceTax: '430,980',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'nx-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: '車外への威嚇を強化し、不審な接近を未然に警告。',
            price: '443,800',
            priceTax: '488,180',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'nx-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: '全機能を解放。NXを守るためのANGフラッグシッププラン。',
            price: '481,800',
            priceTax: '529,980',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // ランドクルーザー70専用設定データ
    const landcruiser70Plans = [
        {
            id: 'lc70-grgo-5vf',
            brand: 'Grgo',
            grade: '5Vf II ＋ トリプル',
            description: '1WAYリモコンのみ付属のモデル。トリプルセンサーを追加し検知を強化。アドブルーリッド対策も対応可。',
            price: '225,800',
            priceTax: '248,380',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'lc70-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ トリプル',
            description: 'アンサーバックリモコンモデル。トリプルセンサーで検知能力を強化。',
            price: '243,800',
            priceTax: '268,180',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'lc70-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II',
            description: '傾斜センサー・1WAYリモコン付属の最上位Grgo。アナログキー車に最適なセッティングで施工。',
            price: '265,800',
            priceTax: '292,380',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'lc70-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ トリプル',
            description: 'パンテーラの緻密なアルゴリズムを70に。トリプルセンサーで全方位監視。',
            price: '313,800',
            priceTax: '345,180',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc70-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306',
            description: '人気の傾斜センサーを標準装備。70の盗難・レッカー被害を徹底阻止。',
            price: '335,800',
            priceTax: '369,380',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc70-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ マイクロ波',
            description: '接近検知を追加。不審なうろつきや車内覗き込みを未然に防ぎます。',
            price: '387,800',
            priceTax: '426,580',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc70-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706',
            description: '全センサー装備の最高峰。70を守り抜くANGのフルスペックパッケージ。',
            price: '425,800',
            priceTax: '468,380',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: true, algorithm: false, canguard: false, ir: true },
            category: 'パンテーラ'
        }
    ];

    // GX550専用設定データ
    const gxPlans = [
        {
            id: 'gx-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '傾斜センサー標準装備。CANガードと1WAYリモコンも付属。',
            price: '336,600',
            priceTax: '370,260',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'gx-grgo-zvt-microwave',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード ＋ マイクロ波',
            description: 'ZVT IIに車外接近検知（うろつき対策）を追加。',
            price: '388,600',
            priceTax: '427,460',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'gx-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの緻密な感度調整を活かす実戦的パッケージ。',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'gx-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ マイクロ波',
            description: 'Z106パッケージに接近検知のマイクロ波をプラス。',
            price: '426,800',
            priceTax: '469,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'gx-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '全方位検知のZ306に最新のCANガードを融合。',
            price: '396,800',
            priceTax: '436,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'gx-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: '全方位検知のZ306に、接近検知のマイクロ波をプラス。',
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'gx-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'すべてのセンサーを装備した究極の多重防御モデル。',
            price: '486,800',
            priceTax: '535,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // LX600専用設定データ
    const lxPlans = [
        {
            id: 'lx-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの緻密なアルゴリズムで誤報を排し鉄壁の護り。',
            price: '384,800',
            priceTax: '423,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lx-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: 'フラッグシップSUVに相応しい多機能検知パッケージ。',
            price: '406,800',
            priceTax: '447,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lx-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: '多機能検知パッケージに、事前検知のマイクロ波をプラス。',
            price: '458,800',
            priceTax: '504,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lx-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: '全センサー装備の最高峰。LXを守り抜く最強の選択肢。',
            price: '496,800',
            priceTax: '546,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // LBX専用設定データ（構成は同様だがボンネット等の追加を強調）
    const lbxPlans = [
        {
            id: 'lbx-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード',
            description: 'LBX必須のボンネットセンサーとCANガードを含む基本パッケージ。',
            price: '302,800',
            priceTax: '333,080',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lbx-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '感度良好な傾斜センサーを搭載。LBXに最高水準の守りを。',
            price: '334,600',
            priceTax: '368,060',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lbx-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード',
            description: 'パンテーラの緻密な警備を。小回りの利くLBXにも最適な布陣。',
            price: '372,800',
            priceTax: '410,080',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lbx-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '充実のセンサー群で死角なし。デジタル盗難手口も完全ブロック。',
            price: '394,800',
            priceTax: '434,280',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lbx-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: '車外検知を追加し、高級コンパクトLBXの価値を徹底防衛。',
            price: '446,800',
            priceTax: '491,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lbx-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'すべてのセンサーを纏った、LBXのための最強仕様。',
            price: '484,800',
            priceTax: '533,280',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // ランドクルーザー250専用設定データ
    const landcruiser250Plans = [
        {
            id: 'lc250-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: '新型250に必須のボンネット保護とCANガードを融合。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc250-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '傾斜センサーと1WAYリモコン付属。多重防御のANG推奨プラン。',
            price: '336,600',
            priceTax: '370,260',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc250-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの緻密な感度調整で、新型250を誤報なく守る。',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ マイクロ波',
            description: '接近検知のマイクロ波を追加。不審なうろつきを未然に排除。',
            price: '426,800',
            priceTax: '469,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '全センサー構成のZ306に最先端のデジタル対策を統合。',
            price: '396,800',
            priceTax: '436,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: 'センサー満載のフルガード。250の安全をあらゆる角度から監視。',
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: '全センサー＋バックアップサイレン。250を守り抜く究極の回答。',
            price: '486,800',
            priceTax: '535,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];


    // ランドクルーザー 150/200系 (スマートキー車両) 専用設定データ

    const landcruiser150Plans = [
        {
            id: 'lc150-grgo-zv-keyless',
            brand: 'Grgo',
            grade: 'ZV II ＋ 純正ロック連動/スマクロ ＋ トリプル',
            description: '純正ロックに連動し、日常の利便性を損なわず愛車を守る基本パッケージ。',
            price: '260,855',
            priceTax: '286,940',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'lc150-grgo-zv-canguard',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: '信頼のZV IIにCANインベーダー対策ユニットを物理追加した鉄壁プラン。',
            price: '272,600',
            priceTax: '299,860',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc150-grgo-zvt-keyless',
            brand: 'Grgo',
            grade: 'ZVT II ＋ 純正ロック連動/スマクロ',
            description: '傾斜センサー含むフルセンサー構成に純正ロック連動をプラスし、利便性を高めた一台。',
            price: '299,600',
            priceTax: '329,560',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'lc150-grgo-zvt-canguard',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '傾斜センサー含むフルセンサー構成にCANガードを統合した最良バランスの一台。',
            price: '310,827',
            priceTax: '341,909',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc150-panthera-z106-keyless',
            brand: 'Panthera',
            grade: 'Z106 ＋ 純正ロック連動/スマクロ ＋ トリプル',
            description: 'パンテーラの緻密な感度はそのままに、純正ロックに連動し日常の利便性を確保。',
            price: '321,300',
            priceTax: '353,430',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc150-panthera-z106-canguard',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラに独自のCANガードを施工。デジタルとアナログの高度な融合。',
            price: '332,800',
            priceTax: '366,080',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc150-panthera-z306-keyless',
            brand: 'Panthera',
            grade: 'Z306 ＋ 純正ロック連動/スマクロ',
            description: '不動の人気Z306に純正ロック連動をプラス。高い防犯性能と使いやすさを両立。',
            price: '348,300',
            priceTax: '383,130',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc150-panthera-z306-canguard',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '不動の人気Z306にCANガードをプラス。圧倒的な防犯性能と安心を提供。',
            price: '359,800',
            priceTax: '395,780',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc150-panthera-z706-keyless',
            brand: 'Panthera',
            grade: 'Z706 ＋ 純正ロック連動/スマクロ',
            description: 'ANG最強の組み合わせに純正ロック連動をプラス。利便性を極めた最上位パッケージ。',
            price: '438,300',
            priceTax: '482,130',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: false, ir: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc150-panthera-z706-canguard',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'ANG最強の組み合わせ。バックアップサイレン、全センサー、物理CAN対策の集大成。',
            price: '449,800',
            priceTax: '494,780',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // ハリアー（80系）専用設定データ
    const harrier80Plans = [
        {
            id: 'harrier-grgo-zv-smaclo',
            brand: 'Grgo',
            grade: 'ZV II ＋ 純正ロック連動/スマクロ ＋ トリプル',
            description: '信頼のZV IIに純正ロック連動（スマクロ）を追加。利便性を損なわず最新の盗難手口からガード。',
            price: '293,800',
            priceTax: '323,180',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'harrier-grgo-zv-canguard',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: 'ZV IIをベースに、物理的なCANガードを施工。デジタルとアナログの多重防御でハリアーを守ります。',
            price: '289,800',
            priceTax: '318,780',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'harrier-grgo-zvt-smaclo',
            brand: 'Grgo',
            grade: 'ZVT II ＋ 純正ロック連動/スマクロ',
            description: '傾斜センサーを標準装備した最上位Grgo。スマクロ機能で、より今の時代にあったセキュリティーとして選ばれています。',
            price: '320,800',
            priceTax: '352,880',
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'harrier-grgo-zvt-canguard',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: 'ZVT IIの高度な検知能力に、物理CANガードを統合。ハリアーの盗難・部品盗を徹底阻止。',
            price: '316,800',
            priceTax: '348,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'harrier-panthera-z106-smaclo',
            brand: 'Panthera',
            grade: 'Z106 ＋ 純正ロック連動/スマクロ ＋ トリプル',
            description: 'パンテーラの緻密なアルゴリズムと、スマクロの利便性を融合。大きな車体のハリアーに最適なパッケージ。',
            price: '363,800',
            priceTax: '400,180',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'harrier-panthera-z106-canguard',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'Z106をベースに、物理CANガードを追加。あらゆる角度から狙われるハリアーを鉄壁に護ります。',
            price: '359,800',
            priceTax: '395,780',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'harrier-panthera-z306-smaclo',
            brand: 'Panthera',
            grade: 'Z306 ＋ 純正ロック連動/スマクロ',
            description: '人気の傾斜センサーを標準装備したZ306。最新のスマクロ機能を加え、最新手口への対策と使い勝手を両立。',
            price: '390,800',
            priceTax: '429,880',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'harrier-panthera-z306-canguard',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: 'Z306の多機能検知に物理CAN対策をプラス。レッカー盗難もインベーダーも、どちらも妥協なく防ぎます。',
            price: '386,800',
            priceTax: '425,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'harrier-panthera-z706-smaclo',
            brand: 'Panthera',
            grade: 'Z706 ＋ 純正ロック連動/スマクロ',
            description: 'パンテーラ最高峰。全センサー、バックアップサイレンのフルスペックに、スマクロの最新CAN対策を統合。',
            price: '480,800',
            priceTax: '528,880',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'harrier-panthera-z706-canguard',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'ANG最強のハリアー防衛プラン。フルスペックパンテーラ＋物理CANガードの、正真正銘の鉄壁モデル。',
            price: '476,800',
            priceTax: '524,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true },
            category: 'パンテーラ'
        }
    ];

    // 40系アルファード・ヴェルファイア専用設定データ
    const alphardVellfire40Plans = [
        {
            id: 'av40-grgo-zv-keyless',
            brand: 'Grgo',
            grade: 'ZV II ＋ 純正ロック連動/スマクロ ＋ トリプル',
            description: '純正ロック連動で利便性を高めつつ、トリプルセンサーで愛車をしっかり保護します。',
            price: '292,959',
            priceTax: '322,255',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'av40-grgo-zv-canguard',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: '物理的なCANインベーダー対策とトリプルセンサーを組み合わせた実戦的パッケージ。',
            price: '270,728',
            priceTax: '297,800',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'av40-grgo-zvt-keyless',
            brand: 'Grgo',
            grade: 'ZVT II ＋ 純正ロック連動/スマクロ',
            description: '傾斜センサー含むZVT IIに純正ロック連動をプラス。毎日の使いやすさと安心を両立。',
            price: '294,364',
            priceTax: '323,800',
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'av40-grgo-zvt-canguard',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: 'ZVT IIをベースに、物理CAN対策を統合。多重のセンサーと物理防御で40系をガード。',
            price: '295,273',
            priceTax: '324,800',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'av40-panthera-z106-keyless',
            brand: 'Panthera',
            grade: 'Z106 ＋ 純正ロック連動/スマクロ ＋ トリプル',
            description: 'パンテーラの緻密なアルゴリズムに純正ロック連動を統合し、実用性を極めたプラン。',
            price: '333,455',
            priceTax: '366,800',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'av40-panthera-z106-canguard',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの基本性能に物理CANガードをプラス。デジタルとアナログ両面から阻止。',
            price: '315,545',
            priceTax: '347,100',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'av40-panthera-z306-keyless',
            brand: 'Panthera',
            grade: 'Z306 ＋ 純正ロック連動/スマクロ',
            description: '多重センサーのZ306と純正ロック連動で、隙のない防犯体制とスムーズな操作を実現。',
            price: '358,000',
            priceTax: '393,800',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'av40-panthera-z306-canguard',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: 'Z306の多重センサーに物理CAN対策を統合。レッカー盗難もCANインベーダーも防ぎます。',
            price: '358,909',
            priceTax: '394,800',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'av40-panthera-z706-keyless',
            brand: 'Panthera',
            grade: 'Z706 ＋ 純正ロック連動/スマクロ',
            description: 'フルスペックパンテーラに純正ロック連動をプラス。究極の防犯と快適さの到達点。',
            price: '439,818',
            priceTax: '483,800',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: false, ir: true },
            category: 'パンテーラ'
        },
        {
            id: 'av40-panthera-z706-canguard',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'ANGが提案する究極の40系防衛プラン。フルスペックパンテーラと物理CANガードの正真正銘の鉄壁。',
            price: '440,727',
            priceTax: '484,800',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // K-CAR（軽自動車）専用設定データ
    const kcarPlans = [
        {
            id: 'kcar-grgo-1vs',
            brand: 'Grgo',
            grade: '1Vs II',
            description: '難しい操作は一切不要。純正キーのロック・アンロックに連動して警備を開始する、K-CARオーナーに一番人気のパッケージ。',
            price: '124,800',
            priceTax: '137,280',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'kcar-grgo-5vf',
            brand: 'Grgo',
            grade: '5Vf II',
            description: '薄型1WAYリモコン付属。スマートな見た目と確かな防犯性能を両立したスタンダードモデル。',
            price: '156,800',
            priceTax: '172,480',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'kcar-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II',
            description: '日本語表示可能なアンサーバックリモコンで操作性抜群。離れた場所からでも異常を感知し、手元のリモコンへ通知。',
            price: '172,800',
            priceTax: '190,080',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'kcar-grgo-zv-smart',
            brand: 'Grgo',
            grade: 'ZV II ＋ 純正ロック連動/スマクロ',
            description: 'ZV IIに純正ロック連動（スマクロ）を追加。利便性を損なわず、最新の手口から愛車を守ります。',
            price: '207,800',
            priceTax: '228,580',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'kcar-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II',
            description: '傾斜・トリプルセンサーを同梱。ジャッキアップや車体へのあらゆる衝撃を逃さず検知する、Grgo最上位構成。',
            price: '219,800',
            priceTax: '241,780',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'kcar-grgo-zvt-smart',
            brand: 'Grgo',
            grade: 'ZVT II ＋ 純正ロック連動/スマクロ',
            description: '最高位Grgoに純正ロック連動を追加。あらゆる衝撃・傾斜検知に利便性をプラスした究極の軽カープラン。',
            price: '264,600',
            priceTax: '291,060',
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'kcar-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ 純正ロック連動/スマクロ',
            description: 'パンテーラの緻密な警備。スマクロ対応により、純正キーの快適さを維持しながらハイエンドブランドの安心を。',
            price: '293,800',
            priceTax: '323,180',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'kcar-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ 純正ロック連動/スマクロ',
            description: '人気センサーを網羅したZ306にスマクロを追加。ホイール盗難からイタズラまで、全方位で車両を監視。',
            price: '315,800',
            priceTax: '347,380',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'kcar-panthera-z706',
            brand: 'Panthera',
            grade: 'Z706 ＋ 純正ロック連動/スマクロ',
            description: '全センサー解放。マイクロ波による接近検知やバックアップサイレンまで備えた、K-CARの防犯を極めるための頂点プラン。',
            price: '395,800',
            priceTax: '435,380',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: false },
            category: 'パンテーラ'
        }
    ];

    // ジムニー（JB64/JB74/JC74）専用設定データ
    const jimnyPlans = [
        {
            id: 'jimny-grgo-1vs',
            brand: 'Grgo',
            grade: '1Vs II',
            description: '操作性に優れた純正ロック連動モデル。純正キーの施錠・解錠に連動して警備を開始でき、初めての方でも安心。',
            price: '142,800',
            priceTax: '157,080',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'jimny-grgo-5vf',
            brand: 'Grgo',
            grade: '5Vf II',
            description: '薄型1WAYリモコンが付属。状況に応じた設定変更がしやすく、サブのリモコンとしても重宝します。',
            price: '180,800',
            priceTax: '198,880',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'jimny-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II',
            description: '2WAYアンサーバックリモコンにより、離れた場所からでも車両の異常をリアルタイムで把握可能。',
            price: '198,800',
            priceTax: '218,680',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'jimny-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II',
            description: '傾斜センサーとトリプルセンサーを標準装備。ジャッキアップや車体への衝撃を確実にキャッチする上位モデル。',
            price: '248,800',
            priceTax: '273,680',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'jimny-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106',
            description: 'パンテーラの高精度な検知能力をジムニーに。将来的なセンサー追加にも柔軟に対応できるベースモデル。',
            price: '268,800',
            priceTax: '295,680',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'jimny-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306',
            description: 'トリプルセンサーと傾斜センサーが同梱。ジムニーの人気カスタムパーツであるタイヤ・ホイールも死角なくガード。',
            price: '318,800',
            priceTax: '350,680',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'jimny-panthera-z706',
            brand: 'Panthera',
            grade: 'Z706',
            description: 'すべてのセンサーを網羅した最高峰フルスペックモデル。ジムニーを愛するオーナー様のための究極の守り。',
            price: '408,800',
            priceTax: '449,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: false, canguard: false },
            category: 'パンテーラ'
        }
    ];

    // シビックTYPE-R（FL5）専用設定データ
    const civicFL5Plans = [
        {
            id: 'fl5-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II',
            description: 'ジャッキアップを警告する傾斜センサーやトリプルセンサーを含む、スポーツカーに必須の検知能力を備えたモデル。',
            price: '268,800',
            priceTax: '295,680',
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'fl5-grgo-zvt-full',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '最上位ZVT IIに純正ロック連動と物理CANガードを追加。利便性と鉄壁の防犯性能を両立した推奨パッケージ。',
            price: '309,800',
            priceTax: '340,780',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'fl5-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106',
            description: 'パンテーラの緻密な警備アルゴリズム。ベースモデルながらスポーツカーの盗難リスクを大幅に低減。',
            price: '288,800',
            priceTax: '317,680',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'fl5-panthera-z106-full',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード',
            description: 'Z106に最新のCANインベーダー対策を統合。物理的な盾を設けることで、不正なエンジン始動を阻止。',
            price: '329,800',
            priceTax: '362,780',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'fl5-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306',
            description: '傾斜センサーとトリプルセンサーを標準装備。あらゆる角度からの侵入・いたずら・移動を即座に検知。',
            price: '338,800',
            priceTax: '372,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'fl5-panthera-z306-full',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '充実のセンサー構成に多重の盗難防止策を上乗せ。FL5オーナーに一番支持される、隙のない最強構成。',
            price: '379,800',
            priceTax: '417,780',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'fl5-panthera-z706',
            brand: 'Panthera',
            grade: 'Z706',
            description: '全センサーを搭載したパンテーラ最高峰。マイクロ波による接近検知やバックアップサイレンを備えた頂点の守り。',
            price: '428,000',
            priceTax: '470,800',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: false, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'fl5-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'ANGのノウハウを全て投入。フルスペックパンテーラに物理CAN対策を加えた、TYPE-Rを守り抜くための最終結論。',
            price: '469,800',
            priceTax: '516,780',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true },
            category: 'パンテーラ'
        }
    ];

    // プリウス（60系）専用設定データ
    const prius60Plans = [
        {
            id: 'prius-grgo-1vs',
            brand: 'Grgo',
            grade: '1Vs II',
            description: 'スマートキーに完全連動。リモコンを追加せず、純正の使い勝手そのままに警備を開始できるベーシックセット。',
            price: '191,055',
            priceTax: '210,160',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'prius-grgo-5vf',
            brand: 'Grgo',
            grade: '5Vf II',
            description: '薄型1WAYリモコンモデル。オプション追加で純正ロック連動も可能（別途費用）。スマートな運用を求める方に。',
            price: '205,600',
            priceTax: '226,160',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'prius-grgo-zv-smaclo',
            brand: 'Grgo',
            grade: 'ZV II ＋ 純正ロック連動/スマクロ',
            description: 'ZV IIにスマクロ機能を追加。CANインベーダーやリレーアタックに対抗する最新のデジタルセキュリティ。',
            price: '258,600',
            priceTax: '284,460',
            features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'prius-grgo-zv-canguard',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード',
            description: '物理的なCANガードを組み合わせた、より強固なパッケージ。デジタル・アナログ両面でプリウスを守ります。',
            price: '254,800',
            priceTax: '280,280',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'prius-grgo-zvt-smaclo',
            brand: 'Grgo',
            grade: 'ZVT II ＋ 純正ロック連動/スマクロ',
            description: '傾斜・トリプルセンサーを同梱した最上位Grgo。ジャッキアップやホイール盗難も逃さず検知。',
            price: '308,600',
            priceTax: '339,460',
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'prius-grgo-zvt-canguard',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: 'ZVT IIの高度な検知に、物理CANガードを統合。プリウスに求められる全ての防犯性能を凝縮。',
            price: '304,800',
            priceTax: '335,280',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'prius-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106',
            description: 'パンテーラの緻密な感度調整がプリウスに。パンテーラリモコンによるドアロック開閉で高い防犯性を発揮。',
            price: '293,600',
            priceTax: '322,960',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'prius-panthera-z106-smaclo',
            brand: 'Panthera',
            grade: 'Z106 ＋ 純正ロック連動/スマクロ',
            description: 'Z106にスマクロ機能を追加。スマートキーの利便性を保ちつつ、パンテーラの鉄壁なバリアを実現。',
            price: '328,600',
            priceTax: '361,460',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'prius-panthera-z106-canguard',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード',
            description: '最高品質のパンテーラに、ANG独自の物理CANガードを施工。二重の盾でエンジンの不正始動を阻止。',
            price: '324,800',
            priceTax: '357,280',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'prius-panthera-z306-smaclo',
            brand: 'Panthera',
            grade: 'Z306 ＋ 純正ロック連動/スマクロ',
            description: '全センサーを搭載した人気モデルにスマクロを追加。ホイール盗難からインベーダーまで完全網羅。',
            price: '378,600',
            priceTax: '416,460',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'prius-panthera-z306-canguard',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '多重センサー警備のZ306に、物理CAN対策をプラス。プリウスオーナーに一番支持される最強の一台。',
            price: '374,800',
            priceTax: '412,280',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'prius-panthera-z706-canguard',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'パンテーラ最高峰。全機能と全センサーを解放し、物理的なデジタル対策も完備した頂点モデル。',
            price: '464,800',
            priceTax: '511,280',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true },
            category: 'パンテーラ'
        }
    ];

    // ハイエース（200系・スマートキー搭載車）専用設定データ
    const hiacePlans = [
        {
            id: 'hiace-grgo-5vf',
            brand: 'Grgo',
            grade: '5Vf II ＋ トリプル ＋ ミラー連動',
            description: '薄型1WAYリモコンでスマートに運用。トリプルセンサーで感度を高め、ミラー連動で利便性も向上。',
            price: '191,000',
            priceTax: '210,100',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false },
            category: 'grgo'
        },
        {
            id: 'hiace-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ トリプル ＋ ミラー連動',
            description: 'リモコンでドアロックと警備を同時操作し、高い防犯効果を実現。実用的なミラー連動も標準装備。',
            price: '223,800',
            priceTax: '246,180',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'hiace-grgo-zv-smart',
            brand: 'Grgo',
            grade: 'ZV II ＋ 純正ロック連動/スマクロ ＋ トリプル ＋ ミラー連動',
            description: '最新の窃盗手口に対抗する純正ロック連動機能を搭載。アンサーバックで車両状態も手元で把握可能。',
            price: '246,800',
            priceTax: '271,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'hiace-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ ミラー連動',
            description: '傾斜・トリプルセンサーを同梱した上位モデル。ハイエースのレッカー盗難も確実に検知。',
            price: '250,800',
            priceTax: '275,880',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'hiace-grgo-zvt-smart',
            brand: 'Grgo',
            grade: 'ZVT II ＋ 純正ロック連動/スマクロ ＋ ミラー連動',
            description: '最高位Grgoに純正ロック連動を追加。利便性と鉄壁の防犯、さらにミラー連動の快適性を一台に。',
            price: '293,800',
            priceTax: '323,180',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'hiace-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ トリプル ＋ ミラー連動',
            description: 'パンテーラの緻密な警備。ドアロック開閉をパンテーラリモコンで行うことで防犯性能を最大化。',
            price: '293,800',
            priceTax: '323,180',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'hiace-panthera-z106-smart',
            brand: 'Panthera',
            grade: 'Z106 ＋ 純正ロック連動/スマクロ ＋ トリプル ＋ ミラー連動',
            description: 'Z106に純正ロック連動を追加。純正スマートキーを使いながら、パンテーラの鉄壁バリアを構築。',
            price: '316,800',
            priceTax: '348,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'hiace-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ ミラー連動',
            description: '全センサー標準装備。ハイエースオーナーに最も支持される、高性能とお買得感を両立したプラン。',
            price: '320,800',
            priceTax: '352,880',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'hiace-panthera-z306-smart',
            brand: 'Panthera',
            grade: 'Z306 ＋ 純正ロック連動/スマクロ ＋ ミラー連動',
            description: 'Z306の多機能検知に純正ロック連動の便利さをプラス。最新のインベーダー対策も網羅したハイエンドプラン。',
            price: '343,800',
            priceTax: '378,180',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        }
    ];

    // クラウン各種（スポーツ・クロスオーバー・セダン・エステート）専用設定データ
    const crownPlans = [
        {
            id: 'crown-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード',
            description: '最新のクラウンシリーズに最適。物理CANガードと最新システムを組み合わせ、利便性と防犯を両立。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'crown-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '傾斜センサーと1WAYリモコンを標準装備。ジャッキアップやレッカー移動にも対応する多重防御プラン。',
            price: '336,600',
            priceTax: '370,260',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'crown-panthera-z106-canguard',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: '最高品質パンテーラをクラウンに施工。CANインベーダー対策とトリプルセンサーで予兆を確実に検知。',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'crown-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ マイクロ波',
            description: 'Z106に覗き込み対策のマイクロ波センサーを追加。不審なうろつきを未然に威嚇、排除します。',
            price: '426,800',
            priceTax: '469,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'crown-panthera-z306-canguard',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '傾斜センサー標準装備の人気モデル。クラウンのあらゆる弱点を補い、誤作動を排した高度な警備を実現。',
            price: '396,800',
            priceTax: '436,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'crown-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: 'センサー満載のフルガードパッケージ。うろつき検知を追加し、高級車クラウンを全方位から監視。',
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'crown-panthera-z706-canguard',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: '全センサー＋バックアップサイレン仕様のパンテーラ最上位。クラウンを守り抜く究極の回答。',
            price: '486,800',
            priceTax: '535,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true },
            category: 'パンテーラ'
        }
    ];

    // ランドクルーザー300専用設定データ
    const landcruiser300Plans = [
        {
            id: 'lc300-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: '最も狙われる300必須のアナログ防御と電子対策をパッケージ。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc300-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '高精度な傾斜センサーが、300のパーツ盗難やレッカーを阻止。',
            price: '336,600',
            priceTax: '370,260',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc300-grgo-zvt-microwave',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード ＋ マイクロ波',
            description: '車外への接近検知を追加。300への干渉を未然に威嚇。',
            price: '388,600',
            priceTax: '427,460',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc300-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: '世界最強クラスのパンテーラで、300への不正信号を遮断。',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ マイクロ波',
            description: '高感度検知を活かし、不審車の接近もうろつきも逃さない。',
            price: '426,800',
            priceTax: '469,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '充実のセンサー群で全方位監視。300を鉄壁の守りへ。',
            price: '396,800',
            priceTax: '436,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ マイクロ波',
            description: 'マイクロ波を含むフルセンサー構成。300防衛の最高峰。',
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 ＋ CANガード',
            description: 'ANGノウハウを結集。300を守るためのバックアップサイレン付最終回答。',
            price: '486,800',
            priceTax: '535,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    const vehicleConfigs: Record<string, any> = {

        'lexus-gx550': {
            name: 'LEXUS GX550',
            year: '2024-',
            image: '/images/Security/vehicle/gx.webp',
            description: '最新鋭のオフローダー。CANインベーダーやゲームボーイといった最新手口への完全対策が必須です。',
            plans: gxPlans
        },
        'lexus-lx': {
            name: 'LEXUS LX600',
            year: '2022-',
            image: '/images/Security/vehicle/lx.webp',
            description: 'レクサスのフラッグシップSUV。最新のデジタル窃盗手口への完全対策が必須であり、Pantheraを中心とした最強の多重防御を推奨します。',
            plans: lxPlans
        },
        'lexus-rx': {
            name: 'LEXUS RX',
            year: '2022-',
            image: '/images/Security/vehicle/rx.webp',
            description: '高い人気を誇るラグジュアリーSUV。スマートキーの利便性を活かしつつ、CANガード等で最新の盗難手口から死角なく守ります。',
            plans: rxPlans
        },
        'lexus-nx': {
            name: 'LEXUS NX',
            year: '2021-',
            image: '/images/Security/vehicle/nx.webp',
            description: '都会派SUVとして高い支持。利便性を損なわず、かつ強力な防犯性能を両立させます。',
            plans: nxPlans
        },
        'lexus-lbx': {
            name: 'LEXUS LBX',
            year: '2023-',
            image: '/images/Security/vehicle/lbx.webp',
            description: '「高級車の概念を変える」コンパクトSUV。小型車ながら狙われやすいため、確実なデジタル対策が必要です。',
            plans: lbxPlans
        },
        'suzuki-jimny': {
            name: 'Jimny / Sierra / Nomad',
            year: 'JB64 / JB74 / JC74',
            image: '/images/Security/vehicle/jimny.webp',
            description: '絶大な人気を誇るジムニーシリーズ。車上荒らしや盗難のリスクが高いため、GrgoやPantheraによる確実なガードを推奨します。',
            plans: jimnyPlans
        },
        'honda-civic-typer': {
            name: 'Civic TYPE-R (FL5)',
            year: '2022-',
            image: '/images/Security/vehicle/fl5.webp',
            description: '究極のFFスポーツ性能を誇るFL5。国内外での人気の高さから常に盗難の危険と隣り合わせです。最新のCANインベーダー対策を含めた、実戦的な多重防御をご提案します。',
            plans: civicFL5Plans
        },
        'toyota-alphard-vellfire': {
            name: 'Alphard / Vellfire (40)',
            year: '2023-',
            image: '/images/Security/vehicle/al,vel.webp',
            description: '最新の40系。CANインベーダーや最新手口に対し、純正ロック連動や物理CANガードを組み合わせた鉄壁の布陣をご提案します。',
            plans: alphardVellfire40Plans
        },
        'toyota-landcruiser-250': {
            name: 'Land Cruiser 250',
            year: '2024-',
            image: '/images/Security/vehicle/250.webp',
            description: 'プラドの後継として登場した注目の新型モデル。伝統の信頼性に加え、最新のデジタルセキュリティを融合させた最強の防犯対策をご提案します。',
            plans: landcruiser250Plans
        },
        'toyota-landcruiser-70': {
            name: 'Land Cruiser 70',
            year: '2023-',
            image: '/images/Security/vehicle/70.webp',
            description: '不変の信頼性を誇る本格オフローダー。最新モデルでは盗難リスクも高まっており、伝統的な物理防御と最新システムの融合が必要です。※別途オプションでアドブルーリッド対策可能です。',
            plans: landcruiser70Plans
        },
        'toyota-landcruiser-300': {
            name: 'Land Cruiser 300',
            year: '2021-',
            image: '/images/Security/vehicle/300.webp',
            description: '世界的に需要が高く、最も警戒が必要な一台。CANインベーダー、リレーアタック、指紋認証回避など、あらゆる手口を想定した最強の布陣を推奨します。',
            plans: landcruiser300Plans
        },
        'toyota-harrier': {
            name: 'Harrier (80)',
            year: '2020-',
            image: '/images/Security/vehicle/80harrier.webp',
            description: '高い人気を誇るSUV。最新の盗難手口に対し、スマクロ機能や物理CANガードを組み合わせた、都市部でも安心のセキュリティをご提供します。',
            plans: harrier80Plans
        },
        'toyota-hiace': {
            name: 'Hiace',
            year: '200系',
            image: '/images/Security/vehicle/hiace.webp',
            description: '仕事からレジャーまで幅広く活躍するハイエース。狙われやすい車種だからこそ、センサー感度の追求と利便性を両立した専用プランをご用意しました。',
            plans: hiacePlans
        },
        'toyota-prius': {
            name: 'Prius (60)',
            year: '2023-',
            image: '/images/Security/vehicle/prius.webp',
            description: '洗練されたデザインと高い防犯性能の両立。最新の60系プリウスに対し、CANガードやパンテーラを組み合わせた、都市部でも安心のパッケージをご提案します。',
            plans: prius60Plans
        },
        'lexus-lm': {
            name: 'LEXUS LM',
            year: '2023-',
            image: '/images/Security/vehicle/lx.webp',
            description: '究極の移動空間。その価値に見合う、隙のないセキュリティ構築をご提案します。'
        },
        'toyota-crown': {
            name: 'Crown',
            year: 'Current Models',
            image: '/images/Security/vehicle/crown.webp',
            description: 'スポーツ、クロスオーバー、セダン、エステート。最新のクラウンシリーズに対し、CANガードやパンテーラを組み合わせた、オーナー様のライフスタイルに合わせた最適な防犯対策をご提案します。',
            plans: crownPlans
        },
        'toyota-landcruiser-prado-150-200': {
            name: 'Land Cruiser Prado',
            year: '2009-2023',
            image: '/images/Security/vehicle/prado.webp',
            description: '純正ロック連動による最新の窃盗対策や、物理的なCANガードなど、年式に応じた最適な対策をご提案します。',
            plans: landcruiser150Plans
        },
        'kcar-special': {
            name: 'K-CAR Dedicated Security',
            year: 'Standard Models',
            image: '/images/Security/vehicle/k-car.webp',
            description: '軽自動車だからこそ、センサー感度の追求と利便性を両立。車上荒らしやイタズラから愛車を守る、K-CAR専用の最適パッケージをご提案します。',
            plans: kcarPlans
        },
        'special-model': {
            name: 'Other Models / Custom',
            year: 'Consulting Service',
            image: '/images/Security/vehicle/special-model-v2.png',
            description: '輸入車、旧車、希少車、そしてキャンピングカーまで。リストにない車種でも、ANGの確かな技術力で最適な防犯プランをご提案します。オーナー様の不安に寄り添い、一台一台時間をかけて解析・施工いたします。',
            plans: basePlans
        }
    };


    const currentModelId = modelId || 'lexus-gx550';
    const currentVehicle = vehicleConfigs[currentModelId] || vehicleConfigs['lexus-gx550'];

    // microCMSデータの安全な取得
    let rawPlans = currentVehicle?.plans || basePlans || [];
    
    try {
        if (plans && plans.length > 0) {
            const idMapping: Record<string, string> = {
                'toyota-landcruiser-300': 'land_cruiser_300',
                'toyota-landcruiser-250': 'land_cruiser_250',
                'toyota-landcruiser-prado-150-200': 'land_cruiser_prado',
                'toyota-landcruiser-70': 'land_cruiser_70',
                'toyota-alphard-vellfire': 'alphard_40',
                'lexus-lx': 'lexus_lx',
                'lexus-rx': 'lexus_rx',
                'lexus-nx': 'lexus_nx',
                'lexus-gx550': 'lexus_gx550',
                'lexus-lbx': 'lexus_lbx',
                'lexus-lm': 'lexus_lx',
                'toyota-harrier': 'harrier_80',
                'honda-civic-typer': 'civic_fl5',
                'suzuki-jimny': 'jimny_jb64',
                'toyota-hiace': 'hiace_200_full',
                'toyota-prius': 'prius_60',
                'toyota-crown': 'crown_2024',
                'kcar-special': 'kcar_special',
            };
            const cmsId = idMapping[currentModelId] || currentModelId.replace(/-/g, '_');
            const cmsPlan = plans.find(p => p.id === cmsId);
            
            if (cmsPlan && cmsPlan.items && cmsPlan.items.length > 0) {
                rawPlans = cmsPlan.items.map((item: any, idx: number) => ({
                    id: `cms-${idx}`,
                    brand: (item.name || '').split(/[\s　]/)[0] || 'Unknown',
                    grade: item.name || '',
                    price: item.price || '0',
                    priceTax: '',
                    description: item.description || '',
                    badge: item.badge || '',
                    image: item.image || '',
                    isRecommended: !!(item.badge && (item.badge === 'おすすめ' || item.badge === '推奨構成')),
                    category: (item.name || '').toLowerCase().includes('grgo') ? 'grgo' : 'パンテーラ',
                    features: {
                        triple: item.triple ?? false,
                        tilt: item.tilt ?? false,
                        bonnet: item.bonnet ?? false,
                        microwave: item.microwave ?? false,
                        siren: item.siren ?? false,
                        algorithm: item.algorithm ?? false,
                        canguard: item.canguard ?? false,
                    }
                }));
            }
        }
    } catch (e) {
        console.error("CMS Data Error:", e);
    }

    const filteredPlans = rawPlans.filter((p: any) => {
        if (!p) return false;
        if (filter === 'all') return true;
        if (filter === 'microwave') return p.features?.microwave;
        const categoryMatch = p.category && p.category.includes(filter);
        const brandMatch = p.brand && p.brand.toLowerCase().includes(filter.toLowerCase());
        return categoryMatch || brandMatch;
    });

    // Update Document Title for SEO
    useEffect(() => {
        if (currentVehicle) {
            document.title = `${currentVehicle.name}の盗難対策プラン | 福岡市・大野城のANG`;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', `${currentVehicle.name}専用のカーセキュリティプラン。最新のCANインベーダーやリレーアタック対策に。福岡市内・大野城市のANGは、佐賀・熊本など九州各県からの施工依頼も多数受けている専門店です。`);
            }
        }
    }, [currentVehicle]);

    // アナログキー（非スマートキー）車両かどうかの判定
    const isAnalogKey = modelId === 'toyota-landcruiser-70';
    const isSpecialModel = modelId === 'special-model';

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-32">
            <header className="bg-[#0b1210] text-white p-6 md:p-10 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/2" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-xs md:text-sm font-black text-emerald-400 tracking-[0.4em] uppercase mb-3 italic">
                        {currentVehicle.name.includes('LEXUS') ? 'Lexus' : 'Toyota'} Specialist Works
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tighter italic leading-none mb-4 uppercase">
                        {currentVehicle.name.split(' ').length > 2
                            ? <>{currentVehicle.name.split(' ')[0]} <span className="text-emerald-500">{currentVehicle.name.split(' ').slice(1).join(' ')}</span></>
                            : <>{currentVehicle.name.split(' ')[0]} <span className="text-emerald-500">{currentVehicle.name.split(' ')[1]}</span></>
                        }
                        <br />
                        <span className="text-xl md:text-2xl opacity-80 not-italic">SECURITY SELECTION.</span>
                    </h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-10">
                {/* Vehicle Hero Image Space */}
                <div className="relative mb-16 -mt-12 md:-mt-20">
                    <div className="aspect-[21/9] md:aspect-[25/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-3xl bg-[#0b1210] border-4 border-white relative group">
                        <SafeImage
                            src={currentVehicle.image}
                            alt={currentVehicle.name}
                            className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ${currentVehicle.name.includes('Land Cruiser') ? 'p-1 md:p-2' : 'p-4 md:p-8'
                                }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1210]/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                            <div className="flex items-center gap-3 text-white mb-2">
                                <div className="w-10 h-px bg-emerald-500" />
                                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Visual Identification</span>
                            </div>
                            <h2 className="text-white text-xl md:text-3xl font-black italic tracking-tighter uppercase">{currentVehicle.name} / {currentVehicle.year}</h2>
                        </div>
                    </div>
                </div>

                {/* Main Content Area: Conditional Rendering */}
                {isSpecialModel ? (
                    <div className="flex flex-col gap-12">
                        {/* Custom Consultation Section */}
                        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-emerald-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 opacity-40 rounded-full -mr-32 -mt-32 blur-3xl" />

                            <div className="max-w-4xl mx-auto relative z-10">
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-xs font-black tracking-widest uppercase mb-6 italic">
                                        <MessageSquare className="w-4 h-4" /> Customized Consulting
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-900 mb-6 uppercase">
                                        リストにない車種こそ、<br className="md:hidden" />
                                        <span className="text-emerald-600">対話から始まる防犯</span>を。
                                    </h2>
                                    <p className="text-slate-500 font-bold leading-relaxed max-w-2xl mx-auto">
                                        輸入車、旧車、そして最新の電気自動車まで。構造が複雑な車両や、前例の少ないお車ほど、画一的なプランではなく、一台一台の状態に合わせた緻密な設計が必要です。
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                    {[
                                        {
                                            step: '01',
                                            title: 'Hearing',
                                            text: 'お客様の駐車環境、使用頻度、過去の不安な経験を細かくお伺いします。',
                                            icon: ShieldCheck
                                        },
                                        {
                                            step: '02',
                                            title: 'Diagnosis',
                                            text: '実際にお車を確認し、構造や電気系統、既存のシステムをプロの目で解析します。',
                                            icon: Zap
                                        },
                                        {
                                            step: '03',
                                            title: 'Design',
                                            text: '世界に一台、そのお車とお客様のためだけの最強防犯パッケージを設計します。',
                                            icon: ShieldAlert
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="relative group">
                                            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                                <div className="text-[40px] font-black text-emerald-500/20 italic absolute top-4 right-6 leading-none">{item.step}</div>
                                                <item.icon className="w-10 h-10 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />
                                                <h4 className="text-lg font-black italic text-slate-800 mb-3 uppercase tracking-tighter">{item.title}</h4>
                                                <p className="text-xs text-slate-500 font-medium leading-loose">{item.text}</p>
                                            </div>
                                            {idx < 2 && (
                                                <div className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] z-20">
                                                    <ChevronRight className="w-8 h-8 text-emerald-200" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-[#0b1210] rounded-[2.5rem] p-10 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <h3 className="text-white text-xl md:text-2xl font-black italic mb-2 tracking-tight">まずは、愛車とお越しください。</h3>
                                    <p className="text-emerald-400/80 text-sm font-bold italic">私たちは、お車に触れることから「本当の守り」を始めます。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-4 mb-10 justify-center">
                            {[
                                { id: 'all', label: 'すべて' },
                                { id: 'grgo', label: 'GRGO' },
                                { id: 'パンテーラ', label: 'パンテーラ' },
                                { id: 'microwave', label: 'マイクロ波あり' }
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setFilter(t.id)}
                                    className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${filter === t.id ? 'bg-white border-gray-100 text-gray-900 shadow-xl' : 'bg-transparent border-gray-200/50 text-gray-400 hover:border-gray-300'}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Unified Premium Info Card - Platinum Emerald Re-design */}
                        <div className="mb-10 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-[2rem] p-8 md:p-12 text-slate-900 relative overflow-hidden shadow-2xl border border-emerald-200/40">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full -mr-64 -mt-64 blur-3xl" />

                            <div className="flex flex-col gap-10 relative z-10">
                                {/* Top: Package Title (Dynamic) */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30 text-white">
                                            <ShieldCheck className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-black tracking-tight italic uppercase text-slate-800 leading-none">
                                                エナジー <span className="text-emerald-600 font-black ml-1">{isAnalogKey ? 'Analog Protection' : 'CANインベーダー対策パッケージ'}</span>
                                            </h3>
                                            <div className="h-1 w-20 bg-emerald-500/20 mt-2 rounded-full" />
                                        </div>
                                    </div>
                                    <p className="text-base md:text-lg text-slate-600 font-bold leading-relaxed mb-6 italic tracking-tight">
                                        {isAnalogKey
                                            ? '長年の実績に基づく、伝統的な物理防御と最新システムの融合プラン。'
                                            : '豊富な施工経験から最新の盗難手口に対応させた独自プラン。'}
                                        <span className="text-slate-900 block md:inline font-black ml-0 md:ml-1 underline decoration-emerald-300 decoration-4 underline-offset-4">
                                            {isAnalogKey
                                                ? 'お車の構造を熟知したプロの技で、大切な愛車を徹底的に守り抜きます。'
                                                : 'スマートキーの利便性はそのままに、鉄壁の守りを提供します。'}
                                        </span>
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {(isAnalogKey
                                            ? ['Anti-プロ窃盗集団', 'Anti-自走盗難', 'Anti-部品盗難']
                                            : ['Anti-リレーアタック', 'Anti-CANインベーダー', 'Anti-コードグラバー', 'Anti-ゲームボーイ']
                                        ).map((threat) => (
                                            <span key={threat} className="px-4 py-1.5 bg-white rounded-lg text-[10px] font-black tracking-[0.2em] text-emerald-700 uppercase border border-emerald-100 shadow-sm">
                                                {threat}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <div className="text-slate-800 text-xs font-black tracking-widest uppercase">{isAnalogKey ? 'Analog Immobilize' : 'Digital Immobilize'}</div>
                                            </div>
                                            <div className="text-[12px] text-slate-500 font-bold leading-relaxed ml-3.5">
                                                {isAnalogKey
                                                    ? 'スターター回路等の物理遮断により、エンジンの自走盗難を確実に阻止します。'
                                                    : '不正信号による engine 始動をデジタル的に徹底ブロック。'}
                                            </div>
                                        </div>
                                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <div className="text-slate-800 text-xs font-black tracking-widest uppercase">{isAnalogKey ? 'Robust Protection' : 'Seamless Operation'}</div>
                                            </div>
                                            <div className="text-[12px] text-slate-500 font-bold leading-relaxed ml-3.5">
                                                {isAnalogKey
                                                    ? '屈強なサイレンとセンサー構成により、強引な侵入も即座に迎撃。'
                                                    : '純正キー操作のみで全システムが連動。'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom: Common Equipment (Standard) */}
                                <div className="bg-slate-900/5 rounded-3xl p-8 border border-slate-900/5">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                        <div className="lg:border-r lg:border-slate-200 lg:pr-8 min-w-[max-content]">
                                            <h4 className="text-emerald-700 text-[11px] font-black flex items-center gap-2 tracking-widest uppercase italic mb-1">
                                                <Zap className="w-3.5 h-3.5 fill-emerald-500" /> Standard Equipment
                                            </h4>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">全プラン共通 標準装備</div>
                                        </div>
                                        <div className="flex flex-col gap-4 flex-1">
                                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                                {[
                                                    'ショックセンサ', 'ドアセンサ', 'トランクセンサ', 'イモビライザ', 'オリジナルLEDプレート',
                                                    'ステータスインジケーター', '2WAYアンサーバックリモコン', '暗証番号式バレースイッチ', 'ハイパワーサイレン', 'ハザードフラッシュ機能'
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white border-2 border-emerald-400 shadow-sm shrink-0" />
                                                        <span className="text-[10px] md:text-xs font-black text-slate-600 tracking-tight leading-tight">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            {(filteredPlans.some(p => p.grade.includes('5Vf II')) || currentVehicle.id === 'kcar-special' || currentVehicle.id === 'toyota-landcruiser-70') && (
                                                <p className="text-[11px] md:text-xs font-bold text-rose-500">
                                                    ※注釈: 「5Vf II」は1WAYリモコンモデルとなります。（2WAYアンサーバックリモコンは付属しません）
                                                </p>
                                            )}
                                            {(filteredPlans.some(p => p.grade.includes('1Vs II'))) && (
                                                <p className="text-[11px] md:text-xs font-bold text-rose-500 mt-1">
                                                    ※注釈: 「1Vs II」はリモコンが付属しない純正キー連動モデルとなります。
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white md:bg-transparent rounded-[2rem] md:rounded-none shadow-2xl md:shadow-none overflow-hidden border border-gray-100 md:border-none mb-6 px-6 md:px-0">
                            <p className="mb-4 text-[11px] md:text-xs text-emerald-600 font-bold italic text-left md:text-right leading-relaxed">
                                ※表にチェックが入っていないセンサー類も、オプションとして追加取り付けが可能です。お気軽にご相談ください。
                            </p>
                            {/* Mobile View: Card Stack */}
                            <div className="md:hidden divide-y-[2px] divide-dashed divide-gray-200">
                                {filteredPlans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className={`py-8 ${plan.isRecommended ? 'bg-emerald-50/30 -mx-6 px-6' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{plan.brand}</span>
                                                    {plan.isRecommended && (
                                                        <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">おすすめ</span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">
                                                    {plan.grade.split(' ＋ ').map((part, i) => (
                                                        <span key={i} className="block">
                                                            {i === 0 ? part : <span className="text-base text-gray-600">＋ {part}</span>}
                                                        </span>
                                                    ))}
                                                </h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black tracking-tighter text-gray-900">¥{plan.price}</div>
                                                <div className="text-xs font-bold text-gray-400">(税込¥{plan.priceTax})</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                            {[
                                                { label: 'トリプルセンサー', active: plan.features.triple },
                                                { label: '傾斜センサー', active: plan.features.tilt },
                                                { label: 'ボンネットセンサー', active: plan.features.bonnet },
                                                { label: 'マイクロ波', active: plan.features.microwave },
                                                { label: 'バックアップサイレン', active: plan.features.siren },
                                                { label: '純正ロック連動', active: plan.features.algorithm },
                                                { label: 'CANガード', active: plan.features.canguard }
                                            ].map((f, i) => (
                                                <div key={i} className={`flex items-center gap-2 ${f.active ? 'opacity-100' : 'opacity-20'}`}>
                                                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${f.active ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                                                        <Check className={`w-2 h-2 ${f.active ? 'text-emerald-600' : 'text-gray-400'}`} />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-600 italic whitespace-nowrap">{f.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View: Comparison Table */}
                            <div className="hidden md:block">
                                <table className="w-full table-fixed border-collapse">
                                    <thead>
                                        <tr className="border-b-4 border-[#0b1210]">
                                            <th className="py-6 px-2 lg:px-4 text-left bg-neutral-50/50 w-24 md:w-32 lg:w-[15%]">
                                                <div className="p-2 lg:p-3 bg-[#0b1210] inline-block rounded-xl shadow-xl shadow-emerald-950/20 mb-2">
                                                    <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-400" />
                                                </div>
                                                <div className="text-[#0b1210] text-[10px] lg:text-xs font-black italic tracking-widest uppercase">Security grade</div>
                                                <div className="text-gray-400 text-[8px] font-bold mt-1">比較項目</div>
                                            </th>
                                            {filteredPlans.map((plan) => (
                                                <th key={plan.id} className={`py-6 px-1 lg:px-2 text-center align-top transition-all ${plan.isRecommended ? 'bg-emerald-50/50' : 'bg-white'}`}>
                                                    <div className="text-emerald-500 text-[8px] font-black mb-2 italic tracking-widest leading-none">{plan.brand}</div>
                                                    <div className="flex justify-center">
                                                        <div className="text-[#0b1210] text-[9px] lg:text-[10px] font-black leading-tight flex flex-col items-center italic gap-1">
                                                            {plan.grade.split(' ＋ ').map((part, i) => (
                                                                <span key={i} className={i === 0 ? "text-xs lg:text-sm text-gray-900 border-b-2 border-emerald-400/40 pb-0.5 mb-1 px-2 text-center" : "text-gray-600 text-center"}>
                                                                    {i === 0 ? part : `＋ ${part}`}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { label: 'トリプル', key: 'triple', desc: '衝撃と空圧検知。' },
                                            { label: '傾斜センサー', key: 'tilt', desc: 'レッカー対策。' },
                                            { label: 'ボンネット', key: 'bonnet', desc: 'バッテリー切断対策。' },
                                            { label: 'マイクロ波', key: 'microwave', desc: '不審接近威嚇。' },
                                            { label: 'バックアップ', key: 'siren', desc: '電源断対応サイレン。' },
                                            { label: '純正ロック連動', key: 'algorithm', desc: '純正キー同期。' },
                                            { label: 'CANガード', key: 'canguard', desc: 'デジタル通信遮断。' }
                                        ].map((feature, idx) => (
                                            <tr key={feature.key} className={`hover:bg-neutral-50/50 transition-colors group`}>
                                                <td className="py-5 px-2 lg:px-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-500 transition-colors shrink-0" />
                                                            <span className="text-[10px] lg:text-xs font-black text-gray-600 italic tracking-tighter leading-none">{feature.label}</span>
                                                        </div>
                                                        <div className="text-[8px] text-gray-400 font-bold ml-3.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden h-0 group-hover:h-auto">
                                                            {feature.desc}
                                                        </div>
                                                    </div>
                                                </td>
                                                {filteredPlans.map((plan) => (
                                                    <td key={plan.id} className={`py-5 px-1 text-center ${plan.isRecommended ? 'bg-emerald-50/30' : ''}`}>
                                                        <div className="flex justify-center">
                                                            {(plan.features as any)[feature.key] ? (
                                                                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                                                                    <Check className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-600 stroke-[3px]" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-100" />
                                                            )}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="bg-neutral-50/30">
                                            <td className="py-8 px-2 lg:px-4">
                                                <div className="text-[9px] font-black text-[#0b1210] italic tracking-widest uppercase mb-1">Pricing</div>
                                                <div className="text-[10px] font-black text-gray-500 italic">標準パッケージ価格</div>
                                            </td>
                                            {filteredPlans.map((plan) => (
                                                <td key={plan.id} className={`py-8 px-1 lg:px-2 text-center ${plan.isRecommended ? 'bg-emerald-50/50' : ''}`}>
                                                    <div className="text-sm lg:text-lg font-black tracking-tighter text-gray-900 italic leading-none">
                                                        ¥{plan.price}
                                                    </div>
                                                    <div className="text-[8px] text-gray-400 font-bold mt-1 tracking-widest mb-3">
                                                        (税込¥{plan.priceTax})
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Trust & Commitment Section */}
                <div className="mt-16 bg-[#0b1210] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/4" />
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8 italic">
                            <ShieldCheck className="w-4 h-4" /> Professional Integrity
                        </div>

                        <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter mb-10 leading-tight">
                            私たちは、<span className="text-emerald-500">「見えない守り」</span>に妥協しません。
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                        <Lock className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-black italic tracking-tight">徹底した秘匿施工</h3>
                                </div>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed">
                                    防犯上の理由により、施工中の写真や配線の詳細は一切公開しておりません。それは、万が一車両に侵入された際も、システムの所在を悟らせない「最強の盾」であるための私たちの拘りです。
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                        <Award className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-black italic tracking-tight">認定店としての技術力</h3>
                                </div>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed">
                                    ユピテル（Grgo/Panthera）の最上位認定取付店として、独自の車両解析データを完備。{currentVehicle.name}の構造を熟知したプロが、純正同等のクオリティでインストールいたします。
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left transition-all">
                            <div>
                                <div className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-2">Experience & Results</div>
                                <p className="text-xs text-gray-400 font-bold leading-relaxed">
                                    ブログにて多数の{currentVehicle.name} 施工車両ログを公開中。<br className="hidden md:block" />
                                    数多くの実績が、何よりの信頼の証です。
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/reservation')}
                                className="px-10 py-5 bg-white text-[#0b1210] font-black italic rounded-2xl transition-all hover:bg-emerald-500 hover:text-white active:scale-95 shadow-xl shadow-black/40"
                            >
                                プランの相談を予約する
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0c1311] border-t border-white/5 p-5 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
                    <div className="hidden md:block">
                        <div className="text-emerald-500 text-xs font-black tracking-widest mb-1 italic uppercase">{currentVehicle.name}を最先端の手口から守る</div>
                        <div className="text-white text-xl font-black tracking-tight underline transition-all underline-offset-4 decoration-emerald-500/50">
                            無料相談・お見積もり
                        </div>
                    </div>
                    <a
                        href="https://page.line.me/312qjhsq?openQrModal=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow md:flex-grow-0 bg-emerald-500 hover:bg-emerald-400 text-[#0c1311] px-10 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20"
                    >
                        <span>LINEで相談する</span>
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </a>
                </div>
            </div>
        </div >
    );
};

export default VehicleSecurityDetail;
