import Header from "../components/Header/Header";
import HousesGrid from "../components/Houses/HousesGrid";
import Footer from '../components/Footer/Footer'; 

const HousesPage = () => {
    return (
        <div className="wrapper">
            {/* Верхнее меню */}
            <Header />

            <div className="character__body">
                <section className="section1">
                    <h2 id="section1__title">Houses</h2>

                    <div id="houses-container">
                        <HousesGrid />
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default HousesPage;
