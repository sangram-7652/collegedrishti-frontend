import { NavLink } from "react-router-dom";
import "./MobileFooterNav.css";

import HomeIcon from "../assets/icons/home.png";
import SearchIcon from "../assets/icons/search.png";
import UniversityIcon from "../assets/icons/university.png";
import MentorIcon from "../assets/icons/mentor.png";
import ProfileIcon from "../assets/icons/profile.png";

const navItems = [
  { to: "/", icon: HomeIcon, label: "Home" },
  { to: "/CollegeSearchPage", icon: SearchIcon, label: "Search" },
  {
    to: "/UniversityPage",
    icon: UniversityIcon,
    label: "University",
    chip: "Find",
  },
  { to: "/SuggestMentor", icon: MentorIcon, label: "Mentor", chip: "Suggest" },
  { to: "/user-dashboard", icon: ProfileIcon, label: "Profile" },
];

const MobileFooterNav = () => {
  return (
    <div className="mobile-footer md:hidden">
      <div className="footer-inner">
        {navItems.map(({ to, icon, label, chip }) => (
          <NavLink
            key={to}
            to={to}
            replace
            className={({ isActive }) =>
              `footer-item ${isActive ? "is-active" : ""}`
            }>
            {({ isActive }) => (
              <div className="item-wrap">
                {/* Chip only for University & Mentor */}
                {chip && <div className="mini-chip">{chip}</div>}

                <div className={`icon-box ${isActive ? "active" : ""}`}>
                  <img src={icon} alt={label} />
                </div>

                <span className={isActive ? "active-text" : ""}>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileFooterNav;
