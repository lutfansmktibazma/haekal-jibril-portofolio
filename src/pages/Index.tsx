import Home from './Home';

interface IndexProps {
  loaderDone?: boolean;
}

const Index = ({ loaderDone }: IndexProps) => {
  return <Home loaderDone={loaderDone} />;
};

export default Index;