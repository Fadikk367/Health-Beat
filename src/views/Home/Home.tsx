import React from 'react';

import { CardsPanel, Card, Paragraph, CardHeader } from './Home.css';


const Home: React.FC = () => {
  return (
    <div>
      <h1>Home page</h1>
      <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laborum adipisci tempore est, minus pariatur ut incidunt deserunt unde. Delectus quae maxime hic nesciunt nemo ex architecto omnis veniam magni aliquid repudiandae officia tenetur ea provident, est velit quibusdam similique suscipit quidem. Ipsa, dolores.</Paragraph>
      <CardsPanel>
        <Card>
          <CardHeader>How to measure blood pressure correctly?</CardHeader>
          <Paragraph>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores quae autem quo error repellendus praesentium architecto, non pariatur provident?</Paragraph>
        </Card>
        <Card>
          <CardHeader>How increased blood preassure affects our life?</CardHeader>
          <Paragraph>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores quae autem quo error repellendus praesentium architecto, non pariatur provident?</Paragraph>
        </Card>
        <Card>
          <CardHeader>How to reduce blood preassure?</CardHeader>
          <Paragraph>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores quae autem quo error repellendus praesentium architecto, non pariatur provident?</Paragraph>
        </Card>
      </CardsPanel>
    </div>
  )
}

export default Home;
