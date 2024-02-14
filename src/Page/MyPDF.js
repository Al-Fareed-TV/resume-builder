import React from "react";
import "./MyPDF.css";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import jsonData from "../data/user-profile.json";
import logo from "../img/tvlogo.png";

const styles = StyleSheet.create({
  logo: {
    height: "40px",
    width: "60px",
  },
  text: {
    fontSize: "9px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    fontSize: "9px",
    marginTop: "auto",
    marginBottom: "0px",
  },
  page: {
    padding: "30px",
    fontSize: 11,
  },
  userName: {
    fontSize: 20,
    fontWeight: 800,
    fontFamily: "Times-Roman",
    color: "rgb(78, 175, 210)",
  },
  profileSection: {
    marginVertical: 10,
  },
  url: {
    fontSize: 10,
  },
  subHeading: {
    fontSize: 12,
    color: "rgb(106, 180, 207)",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  lists: {
    marginHorizontal: 15,
  },
  type: {
    fontWeight:"bold"
  },
  projectSection:{
    marginBottom:4
  },
  footer:{
    marginTop:"auto",
    marginBottom:2,
    display:"flex",
    flexDirection:"column",
    fontWeight:'bold',
    justifyContent:"center",
    textAlign:"center"
  },
  line:{
    backgroundColor:"rgb(106, 180, 207)",
    border:"none",
    height:3
  }
});
const getProfileData = (data) => {
  return data[0].profile;
};
const profileData = getProfileData(jsonData);

const getempSkills = (data) => {
  return data[0].skills;
};
const empSkills = getempSkills(jsonData);

const getEmpToolsDetails = (data) => {
  return data[0].tools;
};
const getCodeRef = () => {
  return jsonData[0].codeReference;
};
const getTrainingInfo = () =>{
  return jsonData[0].training;
}
const empTrainingInfo = getTrainingInfo()[0];

const getProjects = () =>{
  return jsonData[0].projects;
}
const projectsData = getProjects()
console.log(getProjects().InhouseProject);
const MyPDF = () => (
  <Document>
    <Page size="A4" style={styles.page} className="page">
      <View className="header" style={styles.header} fixed>
        <Image src={logo} alt="TV Logo" style={styles.logo} />
        <Text style={styles.description}>
          {" "}
          Confidential - TestVagrant Technologies Private Limited
        </Text>
        </View>
      <View className="profile-section" style={styles.profileSection}>
        <Text className="user-name" style={styles.userName}>
          {profileData.Name}
        </Text>
        <Text className="url" style={styles.url}>
          {profileData.url}
        </Text>
        <Text className="sub-heading" style={styles.subHeading}>
          OVERVIEW
        </Text>
        <Text fontSize="9px">{profileData.Overview}</Text>
        <ul style={{ listStyle: "none" }}>
          {profileData.Keys.map((item) => {
            return (
              <li>
                <Text style={styles.lists}>
                  {"\u2022 \t"}
                  {item}
                  <br />
                </Text>
              </li>
            );
          })}
        </ul>
      </View>
      <View style={styles.skillsSection}>
        <Text style={styles.subHeading}>SKILLS</Text>
        <ul style={{ listStyle: "none" }}>
          {empSkills.map((skill) => {
            return (
              <li>
                <Text style={styles.lists}>
                  {"\u2022 \t"}
                  {skill}
                  <br />
                </Text>
              </li>
            );
          })}
        </ul>
      </View>
      <View className="tools-tech-section">
        <Text style={styles.subHeading}>TOOLS AND TECHNOLOGY EXPOSURE</Text>
        <ul style={{ listStyle: "none" }}>
          {getEmpToolsDetails(jsonData).map((tool) => {
            return (
              <li>
                <Text style={styles.lists}>
                  {"\u2022 \t"}
                  {tool}
                </Text>
              </li>
            );
          })}
        </ul>
      </View>
      <View>
        <Text style={styles.subHeading}>CODE REFERENCES</Text>
        <ul style={{ listStyle: "none" }}>
        {getCodeRef().map((item)=>{
          return (
            <li>
            <Text style={styles.lists}>
            {"\u2022 \t"}
            {item}
          </Text>
            </li>
          )
        })}
        </ul>
      </View>
      <View>
      <Text style={styles.subHeading}>TRAINING</Text><br/>
      <Text>Org : {empTrainingInfo.company}</Text>
      <ul style={{ listStyle: "none" }}>
      {empTrainingInfo.keypoints.map((points)=>{
        return(
          <li>
          <Text style={styles.lists}>
            {"\u2022 \t"}
            {points}
          </Text>
          </li>
        )
      })}
      </ul>
      </View>
      <View style={styles.projectSection}>
          <Text style={styles.subHeading}>Projects:</Text>
          {Object.entries(projectsData).map(([projectType, projects], index) => (
            <View key={index}> <br/>
              <Text style={styles.type}>{projectType}:</Text><br/>
              {Object.entries(projects).map(([projectName, projectDetails], idx) => (
                <View key={idx}>
                  <Text style={{fontWeight:'bold'}}>{"\u2022 \t"}{projectName}:</Text> <br/>
                  {projectDetails.map((detail, idx) => (
                    <Text key={idx}>- {detail}<br/></Text>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
        <View className="footer" style={styles.footer} fixed>
            <Text>CIN:U72200KA2014PTC075831</Text>
            <View style={styles.line}></View>
            <Text>TESTVAGRANT TECHNOLOGIES PRIVATE LIMITED</Text>
            <Text>#284, Hothur Square, 1st Floor, 100 Feet Rd, Bengaluru, Karnataka 560008 | <Text>info@testvagrant.com</Text>  </Text>

        </View>
    </Page>
  </Document>
);

export default MyPDF;
