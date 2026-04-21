import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
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
    Monitor
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

interface VehicleSecurityDetailProps {
    assets: any;
}

const VehicleSecurityDetail: React.FC<VehicleSecurityDetailProps> = ({ assets }) => {
    const { modelId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [modelId]);

    const [filter, setFilter] = React.useState('all');

    // 車種別設定データ
    const rxPlans = [
        {
            id: 'rx-grgo-zv-full',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: 'スマート連動とトリプルセンサーを含むANG推奨パッケージ。',
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
            grade: 'Z306 Standard',
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
            grade: 'Z706 Ultimate ＋ CANガード',
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
            description: 'スマート連動とトリプルセンサー。NXオーナーに一番支持される構成。',
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
            grade: 'Z306 Standard',
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
            grade: 'Z706 Ultimate ＋ CANガード',
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
            description: '1WAYリモコンモデルにトリプルセンサーを追加。アドブルーリッド対策も対応可。',
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
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'lc70-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ スマートキー連動',
            description: '傾斜センサー・1WAYリモコン付属の最上位Grgo。利便性と防犯を両立。',
            price: '265,800',
            priceTax: '292,380',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'grgo'
        },
        {
            id: 'lc70-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ トリプル',
            description: 'パンテーラの緻密なアルゴリズムを70に。トリプルセンサーで全方位監視。',
            price: '313,800',
            priceTax: '345,180',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc70-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 Standard',
            description: '人気の傾斜センサーを標準装備。70の盗難・レッカー被害を徹底阻止。',
            price: '335,800',
            priceTax: '369,380',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc70-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ マイクロ波',
            description: '接近検知を追加。不審なうろつきや車内覗き込みを未然に防ぎます。',
            price: '387,800',
            priceTax: '426,580',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: false, algorithm: true, canguard: false },
            category: 'パンテーラ'
        },
        {
            id: 'lc70-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 Ultimate',
            description: '全センサー装備の最高峰。70を守り抜くANGのフルスペックパッケージ。',
            price: '425,800',
            priceTax: '468,380',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: true, algorithm: true, canguard: false, ir: true },
            category: 'パンテーラ'
        }
    ];

    // GX550専用設定データ
    const gxPlans = [
        {
            id: 'gx-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: 'スマート連動にCANガードとトリプルセンサーを追加。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'gx-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: '傾斜センサー標準装備。CANガードと1WAYリモコンも付属。',
            price: '331,600',
            priceTax: '364,760',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'gx-grgo-zvt-microwave',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード ＋ マイクロ波',
            description: 'ZVT IIに車外接近検知（うろつき対策）を追加。',
            price: '369,800',
            priceTax: '406,780',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'gx-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの緻密な感度調整を活かす実戦的パッケージ。',
            price: '360,800',
            priceTax: '396,880',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'gx-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ マイクロ波',
            description: 'Z106パッケージに接近検知のマイクロ波をプラス。',
            price: '391,800',
            priceTax: '430,980',
            features: { triple: true, tilt: false, bonnet: false, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'gx-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: '全方位検知のZ306に最新のCANガードを融合。',
            price: '443,800',
            priceTax: '488,180',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'gx-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 Ultimate ＋ CANガード',
            description: 'すべてのセンサーを装備した究極の多重防御モデル。',
            price: '481,800',
            priceTax: '529,980',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // LX600専用設定データ
    const lxPlans = [
        {
            id: 'lx-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル',
            description: '最新の盗難手口からデジタル・アナログ両面で守ります。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lx-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード',
            description: 'LX必須の傾斜センサー。CANガード、リモコンもセット。',
            price: '331,600',
            priceTax: '364,760',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lx-grgo-zvt-microwave',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード ＋ マイクロ波',
            description: '接近検知を追加し、高級車LXの死角をなくしたモデル。',
            price: '369,800',
            priceTax: '406,780',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lx-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル',
            description: 'パンテーラの緻密なアルゴリズムで誤報を排し鉄壁の護り。',
            price: '360,800',
            priceTax: '396,880',
            features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lx-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ マイクロ波',
            description: 'Z106パッケージに覗き込み対策のマイクロ波を。',
            price: '391,800',
            priceTax: '430,980',
            features: { triple: true, tilt: false, bonnet: false, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lx-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード',
            description: 'フラッグシップSUVに相応しい多機能検知パッケージ。',
            price: '443,800',
            priceTax: '488,180',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lx-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 Ultimate ＋ CANガード',
            description: '全センサー装備の最高峰。LXを守り抜く最強の選択肢。',
            price: '481,800',
            priceTax: '529,980',
            features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // LBX専用設定データ（構成は同様だがボンネット等の追加を強調）
    const lbxPlans = [
        {
            id: 'lbx-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ ボンネット',
            description: 'LBX必須のボンネットセンサーとCANガードを含む基本パッケージ。',
            price: '302,800',
            priceTax: '333,080',
            features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lbx-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード ＋ ボンネット',
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
            grade: 'Z706 Ultimate ＋ CANガード',
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
            grade: 'ZV II ＋ CANガード ＋ トリプル ＋ ボンネット',
            description: '新型250に必須のボンネット保護とCANガードを融合。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc250-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード ＋ ボンネット',
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
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ ボンネット',
            description: 'パンテーラの緻密な感度調整で、新型250を誤報なく守る。',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ ボンネット ＋ マイクロ波',
            description: '接近検知のマイクロ波を追加。不審なうろつきを未然に排除。',
            price: '426,800',
            priceTax: '469,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ ボンネット',
            description: '全センサー構成のZ306に最先端のデジタル対策を統合。',
            price: '396,800',
            priceTax: '436,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ ボンネット ＋ マイクロ波',
            description: 'センサー満載のフルガード。250の安全をあらゆる角度から監視。',
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc250-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 Ultimate ＋ CANガード ＋ ボンネット',
            description: '全センサー＋バックアップサイレン。250を守り抜く究極の回答。',
            price: '486,800',
            priceTax: '535,480',
            isRecommended: true,
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true, ir: true },
            category: 'パンテーラ'
        }
    ];

    // ランドクルーザー300専用設定データ
    const landcruiser300Plans = [
        {
            id: 'lc300-grgo-zv',
            brand: 'Grgo',
            grade: 'ZV II ＋ CANガード ＋ トリプル ＋ ボンネット',
            description: '最も狙われる300必須のアナログ防御と電子対策をパッケージ。',
            price: '314,600',
            priceTax: '346,060',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc300-grgo-zvt',
            brand: 'Grgo',
            grade: 'ZVT II ＋ CANガード ＋ ボンネット',
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
            grade: 'ZVT II ＋ CANガード ＋ ボンネット ＋ マイクロ波',
            description: '車外への接近検知を追加。300への干渉を未然に威嚇。',
            price: '388,600',
            priceTax: '427,460',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 'lc300-panthera-z106',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ ボンネット',
            description: '世界最強クラスのパンテーラで、300への不正信号を遮断。',
            price: '374,800',
            priceTax: '412,280',
            features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z106-microwave',
            brand: 'Panthera',
            grade: 'Z106 ＋ CANガード ＋ トリプル ＋ ボンネット ＋ マイクロ波',
            description: '高感度検知を活かし、不審車の接近もうろつきも逃さない。',
            price: '426,800',
            priceTax: '469,480',
            features: { triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z306',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ ボンネット',
            description: '充実のセンサー群で全方位監視。300を鉄壁の守りへ。',
            price: '396,800',
            priceTax: '436,480',
            features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z306-microwave',
            brand: 'Panthera',
            grade: 'Z306 ＋ CANガード ＋ ボンネット ＋ マイクロ波',
            description: 'マイクロ波を含むフルセンサー構成。300防衛の最高峰。',
            price: '448,800',
            priceTax: '493,680',
            features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 'lc300-panthera-z706-full',
            brand: 'Panthera',
            grade: 'Z706 Ultimate ＋ CANガード ＋ ボンネット',
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
        'lexus-lm': {
            name: 'LEXUS LM',
            year: '2023-',
            image: '/images/Security/vehicle/lx.webp',
            description: '究極の移動空間。その価値に見合う、隙のないセキュリティ構築をご提案します。'
        }
    };

    // 現在の車種設定を取得（見つからない場合はGX550をデフォルトに）
    const currentVehicle = vehicleConfigs[modelId || 'lexus-gx550'] || vehicleConfigs['lexus-gx550'];

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

    const activePlans = currentVehicle.plans || basePlans;
    const filteredPlans = activePlans.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'microwave') return p.features.microwave;
        return p.category === filter;
    });

    // Update Document Title for SEO
    useEffect(() => {
        if (currentVehicle) {
            document.title = `${currentVehicle.name} 専用セキュリティプラン | 名古屋のカーオーディオ＆セキュリティ ANG`;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', `${currentVehicle.name}の盗難対策ならANGにお任せください。CANインベーダーやリレーアタックに対応した最新のセキュリティパッケージをご提案。`);
            }
        }
    }, [currentVehicle]);

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

                <div className="flex flex-wrap gap-3 mb-10">
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
                        {/* Top: CAN Guard (The USP) */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30 text-white">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black tracking-tight italic uppercase text-slate-800 leading-none">
                                        ANG Original Package <span className="text-emerald-600 font-black ml-1">CANガード</span>
                                    </h3>
                                    <div className="h-1 w-20 bg-emerald-500/20 mt-2 rounded-full" />
                                </div>
                            </div>
                            <p className="text-base md:text-lg text-slate-600 font-bold leading-relaxed mb-6 italic tracking-tight">
                                豊富な施工経験から最新の盗難手口に対応させた独自プラン。
                                <span className="text-slate-900 block md:inline font-black ml-0 md:ml-1 underline decoration-emerald-300 decoration-4 underline-offset-4">
                                    スマートキーの利便性はそのままに、鉄壁の守りを提供します。
                                </span>
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {['Anti-リレーアタック', 'Anti-CANインベーダー', 'Anti-コードグラバー'].map((threat) => (
                                    <span key={threat} className="px-4 py-1.5 bg-white rounded-lg text-[10px] font-black tracking-[0.2em] text-emerald-700 uppercase border border-emerald-100 shadow-sm">
                                        {threat}
                                    </span>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <div className="text-slate-800 text-xs font-black tracking-widest uppercase">Digital Immobilize</div>
                                    </div>
                                    <div className="text-[12px] text-slate-500 font-bold leading-relaxed ml-3.5">不正信号によるエンジン始動をデジタル的に徹底ブロック。</div>
                                </div>
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <div className="text-slate-800 text-xs font-black tracking-widest uppercase">Seamless Operation</div>
                                    </div>
                                    <div className="text-[12px] text-slate-500 font-bold leading-relaxed ml-3.5">純正キー操作のみで全システムが連動。</div>
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white md:bg-transparent rounded-[2rem] md:rounded-none shadow-2xl md:shadow-none overflow-hidden border border-gray-100 md:border-none mb-6 px-6 md:px-0">
                    <p className="mb-4 text-[11px] md:text-xs text-emerald-600 font-bold italic text-left md:text-right leading-relaxed">
                        ※表にチェックが入っていないセンサー類も、オプションとして追加取り付けが可能です。お気軽にご相談ください。
                    </p>
                    {/* Mobile View: Card Stack */}
                    <div className="md:hidden divide-y divide-gray-100">
                        {filteredPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`p-6 ${plan.isRecommended ? 'bg-emerald-50/30' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{plan.brand}</span>
                                            {plan.isRecommended && (
                                                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">おすすめ</span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{plan.grade}</h3>
                                        {(plan as any).description && (
                                            <p className="mt-2 text-[10px] text-gray-500 font-medium leading-relaxed italic border-l-2 border-emerald-500/20 pl-2">
                                                {(plan as any).description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black tracking-tighter text-gray-900">¥{plan.price}</div>
                                        <div className="text-xs font-bold text-gray-400">(税込¥{plan.priceTax})</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-2 mb-6">
                                    {[
                                        { label: 'トリプル', val: plan.features.triple },
                                        { label: '傾斜', val: plan.features.tilt },
                                        { label: 'マイクロ波', val: plan.features.microwave },
                                        { label: 'ボンネット', val: plan.features.bonnet },
                                        { key: 'siren', label: 'サイレン', val: plan.features.siren },
                                        { label: 'スマートキー連動', val: plan.features.algorithm },
                                        { label: 'CANガード', val: plan.features.canguard },
                                        { label: 'ドラレコ連動', val: true },
                                        { label: 'IR', val: plan.features.ir },
                                        { label: '1WAYリモコン', val: plan.grade.includes('ZVT') || plan.brand === 'Panthera' }
                                    ].map((f, i) => (
                                        <div key={i} className={`flex flex-col items-center p-3 rounded-xl border ${f.val ? 'bg-white border-emerald-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 opacity-30'}`}>
                                            {f.val ? (
                                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-1 shadow-sm">
                                                    <Check className="w-3.5 h-3.5 stroke-[4]" />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 mb-1" />
                                            )}
                                            <span className={`text-[8px] font-black leading-[1.1] text-center h-6 flex items-center break-all ${f.val ? 'text-gray-900' : 'text-gray-400'}`}>{f.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate('/contact')}
                                    className="w-full py-4 rounded-2xl bg-[#0b1210] text-emerald-400 text-xs font-black shadow-xl shadow-gray-200 flex items-center justify-center gap-2 hover:bg-black transition-colors"
                                >
                                    <span>プラン詳細・お見積もり</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Transposed Comparison Matrix */}
                    <div className="hidden md:block overflow-hidden bg-white rounded-[3rem] shadow-2xl border border-gray-100 mb-16">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead>
                                <tr className="bg-[#0b1210]">
                                    <th className="w-[18%] px-8 py-10 text-emerald-400 text-xs font-black uppercase tracking-widest border-b border-emerald-500/20">比較項目</th>
                                    {filteredPlans.map((plan) => (
                                        <th key={plan.id} className={`px-2 py-8 text-center border-b border-emerald-500/20 ${plan.isRecommended ? 'bg-emerald-900/20 relative' : ''}`}>
                                            {plan.isRecommended && (
                                                <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-[#0b1210] text-[8px] font-black py-0.5 uppercase tracking-tighter shadow-sm">おすすめ</div>
                                            )}
                                            <div className="text-emerald-500 text-[8px] font-black mb-1.5 italic tracking-widest">{plan.brand}</div>
                                            <div className="text-white text-[12px] font-black leading-tight flex flex-col items-center justify-center italic gap-1">
                                                <span>{plan.grade}</span>
                                                {(plan as any).description && (
                                                    <span className="text-[9px] text-emerald-400/60 font-medium not-italic leading-tight max-w-[120px] mx-auto">
                                                        {(plan as any).description}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-gray-900 font-medium">
                                {/* Price Row */}
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <td className="px-8 py-8 font-black text-xs text-gray-700 uppercase tracking-wider bg-gray-200/20">施工価格 <span className="text-[10px] opacity-60">(税込)</span></td>
                                    {filteredPlans.map((plan) => (
                                        <td key={plan.id} className={`px-2 py-8 text-center ${plan.isRecommended ? 'bg-emerald-50/50' : ''}`}>
                                            <div className="text-xl font-black tracking-tighter text-gray-950">¥{plan.price}</div>
                                            <div className="text-[11px] font-bold text-gray-400 mt-1"> (税込¥{plan.priceTax})</div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Feature Rows */}
                                {[
                                    { key: 'triple' as const, label: 'トリプルセンサ', desc: 'ガラス割り等の「衝撃」だけでなく、空圧の変化も検知する高精度センサ。' },
                                    { key: 'tilt' as const, label: '傾斜センサ', desc: '車両の傾き（1度以上）を検知。タイヤ・ホイール盗難やレッカー移動を阻止します。' },
                                    { key: 'microwave' as const, label: 'マイクロ波センサ', desc: '車両への接近を検知。不審者のうろつきや車内への覗き込みを未然に威嚇します。' },
                                    { key: 'bonnet' as const, label: 'ボンネットセンサ', desc: 'エンジンルームへの不正侵入を検知。バッテリー切断による無力化を防ぎます。' },
                                    { key: 'siren' as const, label: 'バックアップサイレン', desc: '車両バッテリーの外された場合でも、内蔵電池の駆動でサイレンを鳴らし続けます。' },
                                    { key: 'algorithm' as const, label: 'スマートキー連動', isEmerald: true, desc: '純正キー操作にセキュリティが自動連動。利便性を損なわず鉄壁の守りを実現。' },
                                    { key: 'canguard' as const, label: 'CANガード', isEmerald: true, desc: '最新手口「CANインベーダー」等を遮断。リレーアタック対策のキーレスOFF機能も含みます。' },
                                    { key: 'dr' as const, label: 'ドラレコ連動録画', isEmerald: true, desc: '警告・警報時にユピテル製ドラレコを自動起動し記録。※別途専用ケーブル(J-760)が必要です。' },
                                    { key: 'ir' as const, label: 'IRセンサ', desc: '車内への侵入を検知。マイクロ波センサと組み合わせることで警報精度が向上します。' },
                                    { key: 'remote1way' as const, label: '1WAYスペアリモコン', desc: '予備としての基本操作はもちろん、ご家族での共用にも便利なリモコン。' },
                                ].map((feature, idx) => {
                                    return (
                                        <tr key={feature.label} className={`border-b border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} group/row`}>
                                            <td className={`px-8 py-6 text-xs font-black tracking-widest ${feature.isEmerald ? 'text-emerald-600' : 'text-gray-500'} bg-gray-50/50 whitespace-nowrap min-w-[240px]`}>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5">
                                                        {feature.label}
                                                        <HelpCircle className="w-3 h-3 text-gray-300 group-hover/row:text-emerald-400 transition-colors cursor-help" />
                                                    </div>
                                                    <div className="max-w-[200px] text-[9px] text-gray-400 font-bold leading-tight opacity-0 group-hover/row:opacity-100 transition-opacity whitespace-normal h-0 group-hover/row:h-auto overflow-hidden">
                                                        {feature.desc}
                                                    </div>
                                                </div>
                                            </td>
                                            {filteredPlans.map((plan) => {
                                                let isChecked = false;
                                                if (feature.key === 'remote1way') {
                                                    isChecked = plan.grade.includes('ZVT') || plan.brand === 'Panthera';
                                                } else if (feature.key === 'dr') {
                                                    isChecked = true; // All our recommended plans support this as option
                                                } else {
                                                    isChecked = !!(plan.features as any)[feature.key];
                                                }

                                                return (
                                                    <td key={plan.id} className={`px-2 py-6 text-center ${plan.isRecommended ? 'bg-emerald-50/30' : ''}`}>
                                                        {isChecked ? (
                                                            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-75">
                                                                <Check className="w-4 h-4 stroke-[4]" />
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-200 text-xs">—</span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <section className="mt-20 border-t border-gray-100 pt-16">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                        <h2 className="text-2xl font-black tracking-tight text-gray-900 italic">選定の決め手：GRGO vs PANTHERA</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-24 h-24 text-gray-900" />
                            </div>
                            <div className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-6 italic">The Standard</div>
                            <h3 className="text-2xl font-black mb-8 text-gray-900 tracking-tighter">Grgo：完成された定番</h3>
                            <div className="space-y-6">
                                <p className="text-lg text-gray-900 font-black leading-relaxed">
                                    Pantheraが“最高峰”なら、<br />
                                    Grgoは“完成された定番”。
                                </p>
                                <p className="text-base text-gray-600 font-medium leading-relaxed">
                                    派手な機能より、確かな安心。<br />
                                    必要な防犯性能をしっかり備え、日常で使いやすく、誤報を抑えた実用性。
                                </p>
                                <p className="text-base text-gray-600 font-medium leading-relaxed">
                                    多くのお客様に選ばれ続けてきた理由は、そのバランスの良さにあります。
                                </p>
                                <p className="text-base text-gray-900 font-black border-l-4 border-emerald-500 pl-4 py-1">
                                    守るべきものに、ちょうどいい安心を。<br />
                                    それが Grgo という選択です。
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#0b1210] p-8 md:p-12 rounded-[3rem] shadow-xl border border-white/5 relative overflow-hidden group hover:shadow-2xl transition-all">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                <ShieldAlert className="w-24 h-24 text-emerald-400" />
                            </div>
                            <div className="text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase mb-6 italic">The Masterpiece</div>
                            <h3 className="text-2xl font-black mb-8 text-white tracking-tighter">Panthera：妥協しない人のための、最高峰。</h3>
                            <div className="space-y-6 text-white/90">
                                <p className="text-lg font-black leading-relaxed text-emerald-400">
                                    ユピテル最高峰のカーセキュリティ。<br />
                                    狙われる車には、それに見合う対策が必要です。
                                </p>
                                <p className="text-base font-medium leading-relaxed text-gray-300">
                                    32段階の細かな感度調整により、<br />
                                    強く守りながら誤報を極限まで抑える。
                                </p>
                                <p className="text-base font-medium leading-relaxed text-gray-300">
                                    車種、駐車環境、使い方まで考え抜き、一台ごとに最適化して仕上げるフルオーダー型セキュリティ。
                                </p>
                                <p className="text-base font-black border-l-4 border-emerald-500 pl-4 py-1">
                                    守るために、妥協しない。<br />
                                    それが Panthera です。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Brand & Remote Showcase */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black text-[#0b1210] mb-8 border-l-4 border-emerald-500 pl-4 italic uppercase tracking-tighter flex items-center gap-3">
                            <Monitor className="w-6 h-6 text-emerald-500" />
                            Remotes & Design
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                            {/* Grgo Brand Card */}
                            <div className="group bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-9 px-4 flex items-center justify-center bg-[#0b1210] rounded-lg">
                                        <span className="text-emerald-400 font-black italic tracking-widest text-base uppercase">Grgo</span>
                                    </div>
                                    <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
                                </div>

                                <div className="flex flex-col gap-6 items-center flex-grow">
                                    <div className="w-full space-y-3">
                                        <div className="relative group/img aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 p-6 flex items-center justify-center">
                                            <div className="absolute inset-x-0 bottom-0 py-2 bg-emerald-500/90 text-white text-[9px] font-black italic text-center tracking-widest opacity-0 group-hover/img:opacity-100 transition-opacity uppercase z-20">Main 2way Remote</div>
                                            <SafeImage
                                                src="/images/Security/model/grgo2way.webp"
                                                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover/img:scale-110"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-3 flex items-center justify-center relative group/spare shadow-inner">
                                                <SafeImage src="/images/Security/model/grgo1way.webp" className="h-full w-auto object-contain transition-transform duration-500 group-hover/spare:scale-110" />
                                                <span className="absolute bottom-2 right-3 text-[8px] font-black text-gray-400 tracking-tighter">1WAY SPARE</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full space-y-4">
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 mb-2 italic">直感的な操作性</h3>
                                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                                フルカラー/モノクロ液晶を採用し、車両の異常をアニメーションと日本語で瞬時に通知。日本のユーザーに最も支持されているブランド。
                                            </p>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {['視認性に優れた日本語表示', '日本の駐車環境に特化', '長期間信頼できる耐久性'].map((point) => (
                                                <li key={point} className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Panthera Brand Card */}
                            <div className="group bg-[#0b1210] rounded-[2.5rem] p-8 shadow-xl border border-gray-800 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-9 px-4 flex items-center justify-center bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/20">
                                        <span className="text-[#0b1210] font-black italic tracking-widest text-base uppercase">Panthera</span>
                                    </div>
                                    <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500 to-transparent opacity-20"></div>
                                </div>

                                <div className="flex flex-col gap-6 items-center flex-grow">
                                    <div className="grid grid-cols-2 gap-3 h-72">
                                        {/* 2WAY Main Remote (Vertical) */}
                                        <div className="relative group/img bg-[#1a2220] rounded-2xl overflow-hidden border border-white/5 p-4 flex flex-col items-center justify-center shadow-inner">
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                                            <SafeImage
                                                src="/images/Security/model/panthera2way.webp"
                                                className="h-full w-auto object-contain drop-shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-transform duration-700 group-hover/img:scale-110"
                                            />
                                            <div className="absolute bottom-1 right-2 text-[6px] font-black text-emerald-500 uppercase tracking-widest bg-[#0b1210]/80 px-1.5 py-0.5 rounded">2way Main</div>
                                        </div>
                                        {/* 1WAY Spare Remote (Vertical) */}
                                        <div className="relative group/spare bg-[#1a2220] rounded-2xl overflow-hidden border border-white/5 p-4 flex flex-col items-center justify-center shadow-inner">
                                            <SafeImage
                                                src="/images/Security/model/panthera1way.webp"
                                                className="h-full w-auto object-contain transition-transform duration-500 group-hover/spare:scale-110"
                                            />
                                            <div className="absolute bottom-1 right-2 text-[6px] font-black text-gray-400 uppercase tracking-widest bg-[#0b1210]/80 px-1.5 py-0.5 rounded">1way Spare</div>
                                        </div>
                                    </div>
                                    <div className="w-full space-y-4">
                                        <div>
                                            <h3 className="text-lg font-black text-white mb-2 italic">究極の迎撃性能</h3>
                                            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                                最先端の検知アルゴリズムを搭載。誤報を極限まで抑えつつ、ターゲットを確実に迎撃するユピテル最高峰ブランド。
                                            </p>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {['業界最高水準の検知能力', '高感度IRセンサ標準対応', 'フルタッチパネル液晶リモコン'].map((point) => (
                                                <li key={point} className="flex items-center gap-2 text-[10px] font-bold text-gray-300">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* LED Plate Feature Card */}
                            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] p-8 shadow-xl border border-emerald-100/50 hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-9 px-4 flex items-center justify-center bg-emerald-100 rounded-lg">
                                        <span className="text-emerald-700 font-black italic tracking-widest text-base uppercase">Authentic</span>
                                    </div>
                                    <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
                                </div>

                                <div className="flex flex-col gap-6 items-center flex-grow">
                                    <div className="w-full space-y-3">
                                        <div className="relative group/img aspect-[4/3] bg-[#0b1210] rounded-3xl overflow-hidden border border-gray-100 p-4 flex items-center justify-center shadow-inner">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2)_0%,transparent_70%)] animate-pulse" />
                                            <div className="absolute inset-x-0 bottom-0 py-2 bg-emerald-500 text-white text-[9px] font-black italic text-center tracking-widest opacity-0 group-hover/img:opacity-100 transition-opacity uppercase z-20">Standard Equipment</div>
                                            <SafeImage
                                                src="/images/Security/model/led-plate.webp"
                                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-transform duration-700 group-hover/img:scale-105"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1 h-24 bg-white/50 rounded-2xl border border-emerald-100 flex items-center justify-center shadow-inner">
                                                <div className="flex flex-col items-center">
                                                    <ShieldCheck className="w-6 h-6 text-emerald-500 mb-1 opacity-50" />
                                                    <span className="text-[8px] font-black text-emerald-600 tracking-widest uppercase italic">Visual Security</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full space-y-4">
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 mb-2 italic">ANG オリジナルLED</h3>
                                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                                夜間の防犯アピールの要。犯人を物理的に寄せ付けない、強力な光の威嚇を全モデルに標準装備。
                                            </p>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {['視認性抜群の高輝度LED', '高級感を高めるアクリル意匠', '全パッケージに標準付帯'].map((point) => (
                                                <li key={point} className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Installation Flow Section */}
                    <div className="relative py-24 bg-gradient-to-b from-[#f8fafc] to-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-sm mt-16">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ecfdf5_0%,transparent_70%)] opacity-30" />
                        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                            <h2 className="text-[10px] font-black tracking-[0.5em] text-emerald-600 uppercase mb-4 italic">Installation Flow</h2>
                            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-950 italic mb-16">施工の流れ・安心の理由</h3>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {[
                                    { step: '01', title: 'ご相談・見学', desc: 'LINEやお電話にて、お客様の環境や不安をご相談ください。' },
                                    { step: '02', title: 'プランニング', desc: '豊富なデータから、お車に最適なパッケージをご提案します。' },
                                    { step: '03', title: '取付', desc: '熟練の技師が一台一台、配線一本まで拘って施工します（1〜3日）。' },
                                    { step: '04', title: 'お引渡し', desc: '実機を使って操作説明を行い、安心してお乗り出しいただけます。' }
                                ].map((item, idx) => (
                                    <div key={item.step} className="relative group">
                                        <div className="text-5xl font-black text-emerald-500/10 absolute -top-10 left-1/2 -translate-x-1/2 group-hover:text-emerald-500/20 transition-colors">{item.step}</div>
                                        <h4 className="text-lg font-black text-gray-900 mb-3 relative z-10">{item.title}</h4>
                                        <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                        {idx < 3 && <ChevronRight className="hidden md:block absolute top-[1.2rem] -right-8 w-6 h-6 text-emerald-500/20" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
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
        </div>
    );
};

export default VehicleSecurityDetail;
