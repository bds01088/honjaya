import backImg from '../../assets/main_img.jpg'

const background = {
    backgroundImage:`url(${backImg})`, 
    backgroundSize:"cover", 
    backgroundRepeat: "no-repeat",
    width: '100vw',
    height: '100vh',
    position: 'fixed'
}


const Main = () => {

    return (
            <div style={ background }>
            </div>
        )
};

export default Main;