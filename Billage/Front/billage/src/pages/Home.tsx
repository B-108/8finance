import Button from "src/components/Common/Button";

function Home() {
  return (
    <>
      <div>여기가 HOME</div>
      <Button
        $basicGreenBtn
        $width = {"30%"}
        > 인증하기 </Button>
    </>
  );
}

export default Home;
