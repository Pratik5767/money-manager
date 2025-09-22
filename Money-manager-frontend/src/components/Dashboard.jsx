import MenuBar from "./MenuBar"
import Sidebar from "./Sidebar";

const Dashboard = ({ children, activeMenu }) => {
    return (
        <div>
            <MenuBar activeMenu={activeMenu} />

            <div className="flex">
                <div className="max-[1080px]:hidden">
                    <Sidebar activeMenu={activeMenu} />
                </div>

                <div className="grow mx-5">{children}</div>
            </div>
        </div>
    )
}

export default Dashboard