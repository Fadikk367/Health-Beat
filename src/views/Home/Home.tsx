import React from 'react';

import { Container, CardsPanel, Title, Subtitle, Card, Graphic, Paragraph, CardHeader } from './Home.css';


const Home: React.FC = () => {
  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '120px' }}>
          <Title>Take care of your future</Title>
          <Subtitle>For you and for your relatives</Subtitle>
        </div>
        <Graphic src='https://health-beat.s3.eu-central-1.amazonaws.com/static/media/background.906d3019.svg'/>
      </div>
      <CardsPanel>
        <Card>
          <CardHeader>How to measure blood pressure correctly?</CardHeader>
          <Paragraph>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores quae autem quo error.</Paragraph>
        </Card>
        <Card>
          <CardHeader>How to reduce blood preassure?</CardHeader>
          <Paragraph>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores quae.</Paragraph>
        </Card>
        <Card>
          <CardHeader>How increased blood preassure affects our life?</CardHeader>
          <Paragraph>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores quae autem quo error repellendus.</Paragraph>
        </Card>
      </CardsPanel>
    </Container>
  )
}

export default Home;
