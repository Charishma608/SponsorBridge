// Components
import AudioPlayer from 'components/AudioPlayer';

const RecommendationsContainer = () => {
    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <h3 className="font-semibold text-primary">Recommendation</h3>
            <div>
                <AudioPlayer />
            </div>
            <div className="text-justify">
                <p className="text-sm">
                    In my experience, this platform have instrumental in expanding professional
                    network and open those to various opportunities, engaging with the industry
                    specific content, participating in discussion and connecting with the
                    professional in my friends. Have not only yield my perspective, but also lead to
                    valuable connection and opportunities.
                </p>
            </div>
        </div>
    );
};

export default RecommendationsContainer;
