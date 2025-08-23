import Header from "./Homepage/components/Header";
import Footer from "./Homepage/components/Footer";
import SectionContainer from "./Homepage/components/SectionContainer";
import Minuta from "./Homepage/components/Minuta";
import TeamCard from "./Homepage/components/TeamCard";
import Location from "./Homepage/components/icons/Location";
import Planet from "./Homepage/components/icons/Planet";
import Shield from "./Homepage/components/icons/Shield";

const Homepage = () => {
    return (
        <div>
            <Header />
            <SectionContainer id="inicio">
                <div className="relative">
                    <img
                    src="/img/cosmos-home2.webp"
                    alt="Astro"
                    className="w-full h-full object-cover"
                    />
                    <div
                    className="absolute top-40 left-40 md:w-1/2 md:h-1/2 lg:w-1/2 xl:w-1/[1/2]"
                    >
                    <h1 className="text-white text-6xl font-bold text-left letter-spacing">
                        Proteje tu arte en cada rincón del universo
                    </h1>
                    <span className="text-[#9795B5] text-left block my-8 xl: text-2xl">
                        Diseños que brindan protección total a tus obras para que puedas
                        llevarlas a cualquier lugar de forma práctica y segura.
                    </span>
                    <a
                        href="#"
                        target="_blank"
                        className="text-white bg-[#FF6E6C] hover:bg-[#e65856] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 text-center"
                        >Conoce más
                    </a>
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer id="cosmos" className="bg-[#EEEEEE] px-64 py-16">
                <div className="">
                    <h3 className="cosmos-orange-text text-4xl text-center mb-8">
                    Bienvenido a
                    </h3>
                    <h1
                    className="cosmos-orange-text text-8xl text-center mb-16 big-letter-spacing"
                    >
                    COSMOS
                    </h1>
                    <p className="text-center text-[#2B3441] text-lg my-8">
                    En Cosmos, combinamos tecnología y pasión por el arte para ofrecer
                    soluciones sociales y ambientales para el mundo cultural. Nos
                    dedicamos a proteger y preservar obras de arte, ofreciendo un universo
                    donde la creatividad, la innovación y el trabajo en equipo convergen
                    para lograr resultados excepcionales.
                    </p>
                    <p className="text-center text-[#2B3441] text-lg my-8">
                    Nuestro enfoque único revoluciona el transporte de obras de arte,
                    haciéndolo seguro, eficiente y responsable en cada paso del camino.
                    Propulsamos soluciones sustentables y colaboramos con artistas para
                    generar un impacto social global.
                    </p>
                </div>
                <div className="mt-20 mb-2 flex justify-center">
                    <Minuta />
                </div>
            </SectionContainer>
            <SectionContainer id="solucion">
                <div className="relative">
                    <img
                    src="/img/cosmos-box.webp"
                    alt="Box"
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="text-white text-center mt-48 px-60">
                        <h1
                        className="text-white text-6xl font-bold text-center tracking-wider"
                        >
                        Hacia un Futuro sin Daños
                        </h1>
                        <p
                        className="text-white block mt-32 text-center lg: text-2xl xl: text-3xl"
                        >
                        Soluciones de logística eco-conscientes con embalajes retornables
                        y una plataforma digital. Nuestra tecnología asegura el transporte
                        seguro de obras de arte además de proporcionar seguimiento en
                        tiempo real que permite conocer el estado de la obra durante cada
                        traslado.
                        </p>
                    </div>
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer id="beneficios">
                <div className="bg-[#050507] flex">
                    <div className="md:w-1/3 px-20 py-20">
                    <h1
                        className="text-[#DCDDEB] font-bold mb-4 text-left tracking-wider text-base sm:text-lg md:text-xl lg:text-4xl xl:text-8xl"
                    >
                        Tu arte siempre bajo nuestra protección
                    </h1>
                    </div>
                    {/* Lado derecho */}
                    <div className="md:w-2/3 px-32">
                    <div className="grid grid-cols-2 gap-8 px-12 py-8">
                        <div className="bg-white rounded-md p-8">
                        <Location className="mx-auto" />
                        <h3
                            className="cosmos-orange-text text-center text-4xl font-bold my-8"
                        >
                            Control Total
                        </h3>
                        <p className="text-[#27303B] text-center">
                            Brindamos seguimiento en tiempo real, permitiéndote conocer el
                            estado de las piezas durante el traslado.
                        </p>
                        </div>
                        <div className="bg-white rounded-md p-8">
                        <Planet className="mx-auto" />
                        <h3
                            className="cosmos-orange-text text-center text-4xl font-bold my-8"
                        >
                            Sostenibilidad
                        </h3>
                        <p className="text-[#27303B] text-center">
                            Fabricado con materiales reutilizables, promovemos una logística
                            artística ecológica, eliminamos los deperdicios y minimizamos la
                            huella de carbono.
                        </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 px-12 py-8">
                        <div className="bg-white rounded-md p-8 flex">
                        <div className="w-2/3">
                            <Shield className="mx-auto" />
                            <h3
                            className="cosmos-orange-text text-center text-4xl font-bold my-8"
                            >
                            Durabilidad
                            </h3>
                            <p className="text-[#27303B] text-center">
                            Embalaje retornable especializado para la industria del arte
                            que garantiza la máxima protección para pinturas valiosas
                            durante el transporte.
                            </p>
                        </div>
                        <div className="w-1/3">
                            <div className="text-[#2B3441] text-center py-4">
                            <h3 className="text-5xl font-bold mb-4">50%</h3>
                            <p className="">
                                más lijero que el embalaje tradicional de madera.
                            </p>
                            </div>
                            <div className="text-[#2B3441] text-center py-4">
                            <h3 className="text-5xl font-bold mb-4">+5 años</h3>
                            <p className="">más de vida útil que embalajes tradicionales.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer id="team" className="bg-[#DCDDEB]">
                <div className="mx-auto px-10 py-40">
                    <h1 className="text-6xl text-center font-bold my-8 text-[#2B3441]">
                    NUESTRO EQUIPO
                    </h1>
                    <div className="grid grid-cols-3 gap-8 px-12 py-8 mt-8">
                    <TeamCard
                        name="Fernanda López"
                        position="CEO"
                        body="Emprendedora, generadora de ideas, políglota."
                        img="/img/team/fernanda.webp"
                        description="Fernanda López - CEO"
                    />
                    <TeamCard
                        name="Carlos Elizondo"
                        position="CMO"
                        body="Carismático, alegre, amante de la creatividad."
                        img="/img/team/carlos.webp"
                        description="Carlos Elizondo - CMO"
                    />
                    <TeamCard
                        name="Andrés Escala"
                        position="CTO"
                        body="Analítico, calculador y trabajador."
                        img="/img/team/andres.webp"
                        description="Andrés Escala - CTO"
                    />
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer id="epilogo">
                <div className="relative">
                    <img
                    src="/img/techo.webp"
                    alt="Techo de palacio de bellas artes"
                    className="w-full h-full object-cover"
                    />
                    <div
                    className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
                    >
                    <div className="text-white text-center px-60">
                        <p className="text-4xl font-bold text-center my-16">
                        En Cosmos, nos enorgullece formar parte del mundo del arte,
                        contribuyendo al legado cultural de las obras.
                        </p>
                        <p className="text-4xl font-bold my-16 text-center">
                        Nos esforzamos por ser aliados confiables y respetados para los
                        artistas, asegurando que sus creaciones perduren en el tiempo y
                        compartan su belleza y significado con las generaciones venideras.
                        </p>
                    </div>
                    </div>
                </div>
            </SectionContainer>
            <Footer />
        </div>
    );
}

export default Homepage;