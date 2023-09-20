import Button from '../components/Common/Button';
import Image from '../components/Common/Image';
import Header from '../components/Header/Header';

function Home() {
    return (
        <div>
            <Header/>
            <Image 
                type="KB" 
                src="src/assets/KB.svg" 
                alt="KB" 
                width="300px" 
                height="200px" 
                $rounded></Image>
            <Image
                type="wallet"
                src="src/assets/wallet.svg"
                alt="wallet"
                width="200px"
                height="500px"
                $rounded
            ></Image>
            <Button
                $Green
                $size="200px,50px">안녕하세요</Button>
        </div>
    );
}

export default Home;
