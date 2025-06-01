-- Sample data for testing the DApp Rankings API
-- This script creates the table and inserts sample data

-- Create the table (if not exists)
CREATE TABLE IF NOT EXISTS dapp_rankings (
    package_id VARCHAR PRIMARY KEY,
    dapp_name VARCHAR NOT NULL,
    dau_1h INTEGER NOT NULL DEFAULT 0,
    dapp_type VARCHAR NOT NULL DEFAULT 'Unknown',
    rank_position INTEGER NOT NULL DEFAULT 0,
    last_update TIMESTAMP DEFAULT NOW()
);

-- Clear existing data
TRUNCATE TABLE dapp_rankings;

-- Insert sample data
INSERT INTO dapp_rankings (package_id, dapp_name, dau_1h, dapp_type, rank_position, last_update) VALUES
('0xda12d621169da92ed8af5f6b332b7bec64c840bb49bb3d4206d6739cd76bad14', 'FanTV AI', 15, 'AI', 1, NOW()),
('0x9c12f3aa14a449a0a23c066589e269086f021a98939f21158cfacb16d19787c3', 'Momentum', 8, 'DEX', 2, NOW()),
('0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb', 'Cetus AMM', 5, 'DEX', 3, NOW()),
('0x2eeaab737b37137b94bea4f2b5b1e9dae8e90fdabf8e8e8e8e8e8e8e8e8e8e8e', 'SuiNS', 4, 'Infra', 4, NOW()),
('0x3ffbbc849c9b4f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f', 'Bluefin', 3, 'DEX', 5, NOW()),
('0x4aaccd950d9b5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e', 'Kriya DEX', 3, 'DEX', 6, NOW()),
('0x5bbdde851f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f', 'Turbos Finance', 2, 'DEX', 7, NOW()),
('0x6cceed752e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e', 'Scallop Lend', 2, 'Lending', 8, NOW()),
('0x7ddfff853f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f', 'Wormhole Bridge', 2, 'Bridge', 9, NOW()),
('0x8eeff0954040404040404040404040404040404040404040404040404040404', 'Clutchy', 1, 'NFT', 10, NOW()),
('0x9fff01055050505050505050505050505050505050505050505050505050505', 'Hop Aggregator', 1, 'Aggregator', 11, NOW()),
('0xaaa012156060606060606060606060606060606060606060606060606060606', 'DeepBook', 1, 'DEX', 12, NOW()),
('0xbbb023257070707070707070707070707070707070707070707070707070707', 'Sui Name Service', 1, 'Infra', 13, NOW()),
('0xccc034358080808080808080808080808080808080808080808080808080808', 'FlowX Finance', 1, 'Aggregator', 14, NOW()),
('0xddd045459090909090909090909090909090909090909090909090909090909', 'Bucket Protocol', 1, 'Infra', 15, NOW()),
('0xeee05656a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0', 'Typus Finance', 1, 'Aggregator', 16, NOW()),
('0xfff06757b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0', 'SuiPad', 1, 'Marketing', 17, NOW());

-- Verify the data
SELECT rank_position, dapp_name, dau_1h, dapp_type, last_update 
FROM dapp_rankings 
ORDER BY rank_position ASC;

-- Show statistics
SELECT 
    COUNT(*) as total_dapps,
    SUM(dau_1h) as total_active_users_1h,
    dapp_type,
    COUNT(*) as count_per_type
FROM dapp_rankings 
GROUP BY dapp_type 
ORDER BY count_per_type DESC; 