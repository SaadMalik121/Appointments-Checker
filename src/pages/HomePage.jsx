import React, { useEffect, useState } from "react";
import LogoutSvg from "../assets/images/LogoutIconSvg";
import LogoSvg from "../assets/images/LogoSvg";
import styles from "./HomePage.module.css";
import { authentication } from "../apis/authenticationApi";
import { useNavigate } from "react-router-dom";
import { appointmentsApi } from "../apis/appointmentsApi";
import VectorSvg from "../assets/images/VectorSvg";
import { Bars } from "react-loader-spinner";

function HomePage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState(false);
  const navigate = useNavigate();

  async function getAppointments() {
    try {
      setLoading(true);
      const appointmentsList = await appointmentsApi.getAppointments();
      setAppointments(appointmentsList);
    } catch (error) {
      console.log(error);
      setAppointmentsError(true);
    } finally {
      setLoading(false);
    }
  }

  const timeSlots = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"];
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const convertTo24HourFormat = (timeString) => {
    const parts = timeString?.split(" ");
    if (parts?.length !== 2) {
      return -1;
    }

    const [hour, ampm] = parts[0]?.split(":");
    const hourNumber = parseInt(hour);

    if (ampm === "AM" && hourNumber === 12) {
      return 0;
    }

    if (ampm === "PM" && hourNumber !== 12) {
      return hourNumber + 12;
    }

    return hourNumber;
  };

  const isAppointmentActive = (appt, day, time) => {
    const selectedHour = convertTo24HourFormat(time);
    const startHour = convertTo24HourFormat(appt.startTimeFormatted);
    const endHour = convertTo24HourFormat(appt.endTimeFormatted);

    if (selectedHour === -1 || startHour === -1 || endHour === -1) {
      return false;
    }

    return (
      appt.weekDay === day &&
      selectedHour >= startHour &&
      selectedHour < endHour
    );
  };

  const onLogoutUser = () => {
    authentication.logoutUser();
    navigate("/");
  };

  useEffect(() => {
    getAppointments();
  }, []);

  if (appointmentsError) {
    return <h1>Error while fetching appointments. Try again later</h1>;
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        <LogoSvg />
        <div onClick={onLogoutUser} className={styles.logoutBtn}>
          <LogoutSvg />
        </div>
      </div>
      {loading ? ( // Check loading state
        <div
          style={{
            marginLeft: "40%",
          }}
        >
          <Bars
            height="80"
            width="80"
            color="#0AA36E"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className={styles.table_container}>
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th>
                    <div
                      onClick={getAppointments}
                      className={styles.refreshIcon}
                    >
                      <VectorSvg />
                    </div>
                  </th>
                  {daysOfWeek.map((day, index) => (
                    <th key={index}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{time}</td>
                    {daysOfWeek.map((day, colIndex) => {
                      const activeAppointment = Object.values(
                        appointments
                      ).find((appt) => isAppointmentActive(appt, day, time));

                      return (
                        <td
                          key={colIndex}
                          className={`${styles.cell} ${
                            activeAppointment ? styles.appointment_cell : ""
                          }`}
                        >
                          {activeAppointment && (
                            <div className={styles.appointment_info}>
                              <strong>{activeAppointment.name}</strong>
                              <p>{activeAppointment.reason}</p>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
