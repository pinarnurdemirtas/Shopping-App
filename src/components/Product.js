import React from 'react';
import { Card, Button, Typography } from 'antd';
import 'antd/dist/reset.css';
import './Product.css'

const { Title, Text } = Typography;

function Product({ total, money, product, basket, setBasket }) {
    const basketItem = basket.find(item => item.id === product.id);

    const addBasket = () => {
        const checkBasket = basket.find(item => item.id === product.id);
        if (checkBasket) {
            checkBasket.amount += 1;
            setBasket([...basket.filter(item => item.id !== product.id), checkBasket]);
        } else {
            setBasket([...basket, {
                id: product.id,
                amount: 1
            }]);
        }
    };

    const removeBasket = () => {
        const checkBasket = basket.find(item => item.id === product.id);
        if (checkBasket) {
            if (checkBasket.amount > 1) {
                checkBasket.amount -= 1;
                setBasket([...basket.filter(item => item.id !== product.id), checkBasket]);
            } else {
                setBasket(basket.filter(item => item.id !== product.id));
            }
        }
    };

    return (
        <div className="product-container">
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img src={product.img} />}
            >
                <Card.Meta title={<Title level={5} style={{ marginBottom: 8 }}>{product.title}</Title>}
                    description={<Text className="price" style={{ fontSize: '16px' }}>{product.price} TL</Text>} />
                    <div className="actions" style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                        type="primary"
                        size="small"
                        disabled={total + product.price > money}
                        onClick={addBasket}
                    >
                        EKLE
                    </Button>
                    <span style={{ margin: '0 8px', fontSize: '14px' }}>{basketItem ? basketItem.amount : 0}</span>
                    <Button
                        type="default"
                        size="small"
                        disabled={!basketItem}
                        onClick={removeBasket}
                    >
                        ÇIKAR
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Product;
