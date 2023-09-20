import Image from '../components/Common/Image';

function Home() {
    return (
        <>
            <div>
                여기가 HOME
                <Image type="KB" src="src/assets/KB.svg" alt="KB" width="200px" height="200px" $rounded></Image>
                <Image
                    type="wallet"
                    src="src/assets/wallet.svg"
                    alt="wallet"
                    width="200px"
                    height="200px"
                    $rounded
                ></Image>
            </div>
        </>
    );
}

export default Home;
