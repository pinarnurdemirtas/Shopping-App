import React, { useEffect, useState } from 'react';
import { Drawer, Button, List, Typography, Divider } from 'antd';  
import Header from './Header';
import axios from 'axios'; // axios'u ekleyin

const { Title } = Typography;

function BasketDrawer({ drawerVisible, onClose, basket, total, money, setMoney, resetBasket }) {
  const [products, setProducts] = useState([]); // Ürünleri tutmak için state

  // API'den ürünleri çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:44373/api/Products');
        setProducts(response.data); // Ürünleri state'e ata
      } catch (error) {
        console.error('Ürünleri çekerken hata:', error);
      }
    };

    fetchProducts(); // Ürünleri çek
  }, []);

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
          const product = products.find(p => p.id === item.id); // API'den alınan ürünleri kullan
          return (
            <List.Item style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {product && ( // Eğer ürün varsa resmi göster
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{ width: 50, height: 50, marginRight: 10, objectFit: 'cover' }}
                  />
                )}
                <div>
                  <strong>{product ? product.title : 'Ürün Bulunamadı'}</strong> - {item.amount} x {product ? product.price : 0} TL
                </div>
              </div>
              <div>
                <strong>{(item.amount * (product ? product.price : 0)).toFixed(2)} TL</strong>
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
