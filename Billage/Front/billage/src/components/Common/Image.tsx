import React from 'react';
import styled, { css } from 'styled-components';

// 이미지 컴포넌트의 속성 정의
interface ImageProps {
    children?: React.ReactNode;
    src: string;
    alt: string;
    width?: string;
    height?: string;

    // 추가적인 스타일링 옵션을 원하는 경우 여기에 추가
    rounded?: boolean;
    bordered?: boolean;

    // opacity:0.8; /* 80% 불투명도 */
    opacity?: boolean;
}

// 스타일드 컴포넌트로 이미지 스타일링
const StyledImage = styled.img<ImageProps>`
    border: 1px solid #ccc;
    max-width: 100%;
    height: auto;

    // 추가적인 스타일링 옵션에 따른 스타일 적용
    ${(props) =>
        props.rounded &&
        css`
            border-radius: 50%;
        `}

    ${(props) =>
        props.bordered &&
        css`
            border: 2px solid #ccc;
        `}
`;

// 이미지 컴포넌트 정의
const Image = (props: ImageProps) => {
    return <StyledImage {...props}>{props.children}</StyledImage>;
};

export default Image;

// const App: React.FC = () => {
//     return (
//         <div>
//             <h1>이미지 컴포넌트 재사용 예제</h1>

//             {/* 이미지 컴포넌트 재사용 */}
//             <ImageComponent
//                 src="example.jpg"
//                 alt="예시 이미지"
//                 width="300px"
//                 height="200px"
//                 rounded // 원형 이미지로 스타일링
//                 bordered // 테두리 추가
//             />

//             <ImageComponent src="another.jpg" alt="또 다른 이미지" width="200px" height="150px" />
//         </div>
//     );
// };
