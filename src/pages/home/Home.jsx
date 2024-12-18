import { Col, Container, Row, Stack } from "react-bootstrap";
import Header from "../../components/header/Header";
import "./home.css";
import CardPizza from "../../components/CardPizza";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";

const Home = () => {
  const { add } = useContext(CartContext);
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/pizzas");
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      alert(
        error,
        "No se pudo conectar con la API. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div className="home">
      <Stack gap={4}>
        <Header />
        <Container fluid="md">
          <Row>
            {pizzas.map((pizza) => (
              <Col md={4} key={pizza.name}>
                <CardPizza
                  {...pizza}
                  onClickAdd={() => {
                    add(pizza);
                  }}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Stack>
    </div>
  );
};

export default Home;
