import { images } from "data/portfolio";
import { DashboardItem, StyledDashboard } from "./styles";
import Image from "elements/components/image";

export interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
    return (
        <StyledDashboard>
            {images.map((image) => {
                return (
                    <DashboardItem key={image.title}>
                        <Image src={image.src} alt={image.title} />
                    </DashboardItem>
                );
            })}
        </StyledDashboard>
    );
};

export default Dashboard;
