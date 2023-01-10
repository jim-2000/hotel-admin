// import Swiper core and required modules
import Slider from "react-slick";
 


const AwsomeSlides = ({data}) => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
          />
        );
      }
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
          />
        );
      }
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      
  return (
    <div className="w-full ">
        <Slider              
            {...settings}
        >
        { data.map((item) => {
            return (             
                    <DataView item={item} key={item.id} />                   
             
            )
        })}
        </Slider >
    </div>
  )
}

export default AwsomeSlides


const DataView = ({item}) => {
    return (
        <div className="flex  justify-start items-start bg-gradient-to-b from-slate-200 to-slate-400 h-[200px] md:h-96 bg-cover bg-left "
        style={{
            backgroundImage: `url(${item.url})`,
        }}
        >
          
            
          {/* <img 
          src={item.img}
          className=" w-full  h-[400px] object-cover bg-cover bg-center"
          /> */}
            {/* <div className="flex flex-col justify-center items-center p-4 md:p-2 ">
                <h1>{item.title}</h1>
                <p>{item.subtitle}</p>
            </div> */}
        </div>
    )
}