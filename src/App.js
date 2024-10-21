import React, { useState, useEffect } from 'react';
import './App.css';
import { Layout, Menu, Badge, Drawer, Button } from 'antd';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import Product from './components/Product';
import BasketDrawer from './components/BasketDrawer';
import axios from 'axios'; // axios'u ekleyin
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

function App() {
  const [money, setMoney] = useState(5000);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]); // Ürünleri tutmak için state

  const resetBasket = () => {
    setBasket([]);
  };

  useEffect(() => {
    // API'den ürünleri çek
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:44373/api/Products');
        console.log('Ürünler:', response.data); // Yanıtı logla
        setProducts(response.data); // Ürünleri state'e ata
      } catch (error) {
        console.error('Ürünleri çekerken hata:', error);
      }
    };

    fetchProducts(); // Ürünleri çek
  }, []);

  useEffect(() => {
    setTotal(
      basket.reduce((acc, item) => {
        return (
          acc + item.amount * products.find((product) => product.id === item.id).price
        );
      }, 0)
    );
  }, [basket, products]); // Ürünleri bağımlılık olarak ekle

  useEffect(() => {
    if (basket.length > 0) {
      setDrawerVisible(true);
    }
  }, [basket]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleMenuClick = (e) => {
    setSelectedCategory(e.key);
    setMenuDrawerVisible(false); // Menü seçildikten sonra kapat
  };

  const toggleMenuDrawer = () => {
    setMenuDrawerVisible(!menuDrawerVisible);
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          type="text" 
          icon={<MenuOutlined style={{ color: '#fff', fontSize: '24px' }} />} 
          onClick={toggleMenuDrawer} 
          className="mobile-menu-button"
        />

        <Drawer
          title="Kategoriler"
          placement="left"
          closable={true}
          onClose={toggleMenuDrawer}
          visible={menuDrawerVisible}
          className="mobile-menu-drawer"
        >
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={['all']}
            onClick={handleMenuClick}
          >
            <Menu.Item key="all">Bütün Çiçekler</Menu.Item>
            <Menu.Item key="buket">Çiçek Buketleri</Menu.Item>
            <Menu.Item key="saksi">Saksı çiçekleri</Menu.Item>
            <Menu.Item key="yemek">Yenilebilir Çiçek</Menu.Item>
          </Menu>
        </Drawer>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['all']}
          onClick={handleMenuClick}
          style={{ flex: 1 }} // Bu menü masaüstü ekranlarda görünür
          className="desktop-menu"
        >
          <Menu.Item key="all">Bütün Çiçekler</Menu.Item>
          <Menu.Item key="buket">Çiçek Buketleri</Menu.Item>
          <Menu.Item key="saksi">Saksı çiçekleri</Menu.Item>
          <Menu.Item key="yemek">Yenilebilir Çiçek</Menu.Item>
        </Menu>
        
        <Badge count={basket.reduce((acc, item) => acc + item.amount, 0)} style={{ marginLeft: 'auto' }}>
          <ShoppingCartOutlined 
            style={{ fontSize: '24px', cursor: 'pointer', color: '#fff'}} 
            onClick={showDrawer} 
          />
        </Badge>
      </Header>
      
      <Content style={{ padding: '50px' }}>
        <div className="container product">
          {filteredProducts.map((product) => (
            <Product
              total={total}
              money={money}
              key={product.id}
              product={product}
              basket={basket}
              setBasket={setBasket}
            />
          ))}
        </div>
      </Content>

      <BasketDrawer
        drawerVisible={drawerVisible}
        onClose={onClose}
        basket={basket}
        total={total}
        money={money}
        setMoney={setMoney}
        resetBasket={resetBasket}
      />
    </Layout>
  );
}

export default App;
