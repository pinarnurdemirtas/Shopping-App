import React from 'react';
import { Drawer, Button, List, Typography, Divider } from 'antd';  
import Header from './Header';
import products from '../products.json';

const { Title } = Typography;

function BasketDrawer({ drawerVisible, onClose, basket, total, money, setMoney, resetBasket }) {
  return (
    <Drawer
      title="Sepet"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={drawerVisible}
      width={400}
    >
      <Header total={total} money={money} setMoney={setMoney} />
    
      <Divider style={{ margin: '16px 0' }} />  
      
      <Title level={4} style={{ textAlign: 'center', marginBottom: '16px' }}>Toplam: {total.toFixed(2)} TL</Title>
      
      <List
        dataSource={basket}
        renderItem={item => {
          const product = products.find(p => p.id === item.id);
          return (
            <List.Item style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: 50, height: 50, marginRight: 10, objectFit: 'cover' }}
                />
                <div>
                  <strong>{product.name}</strong> - {item.amount} x {product.title}
                </div>
              </div>
              <div>
                <strong>{(item.amount * product.price).toFixed(2)} TL</strong>
              </div>
            </List.Item>
          );
        }}
        style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px' }}
      />
      
      {basket.length > 0 && (
        <Button 
          type="primary" 
          onClick={resetBasket} 
          style={{ marginTop: 16, width: '100%' }}
        >
          Sepeti Temizle
        </Button>
      )}
    </Drawer>
  );
}

export default BasketDrawer;
