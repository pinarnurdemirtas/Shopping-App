import React from 'react';
import { Typography, Space } from 'antd';
import './Header.css';  

const { Title, Text } = Typography;

function Header({ total, money }) {
  return (
    <div className="header">
      <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          Bakiyeniz..
        </Title>
        <Text style={{ fontSize: '18px', color: '#fff' }}>
          {total > 0 ? (
            `Harcayacak ${money - total} TL paranız kaldı.`
          ) : (
            `Harcayacak ${money} TL paranız var.`
          )}
        </Text>
      </Space>
    </div>
  );
}

export default Header;
