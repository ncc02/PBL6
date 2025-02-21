const { default: instance } = require("utils/axiosCutomize");
const fetchAllSchedule = (limit = 100, offset = 0) => {
  return instance.get("/api/schedules/?limit=" + limit + "&offset=" + offset);
};
const fetchAllScheduleByDoctorId = (doctorId, limit = 10, offset = 0) => {
  return instance.get(
    "/api/schedulerdoctor/?doctor=" +
      doctorId +
      "&limit=" +
      limit +
      "&offset=" +
      offset,
  );
};
const addScheduleDoctor = (doctorId, scheduleId) => {
  console.log("add: doctorid" + doctorId + " scheduleid: " + scheduleId);
  return instance.post("/api/schedulerdoctor/", {
    doctor_id: doctorId,
    schedule_id: scheduleId,
  });
};

const addSomeScheduleDoctor = (doctorId, scheduleIds) => {
  return instance.post("/api/addschedulerdoctors/", {
    doctor_id: doctorId,
    schedule_ids: scheduleIds,
  });
};

const deleteScheduleDoctor = (scheduleDoctorId) => {
  return instance.delete("/api/schedulerdoctor/" + scheduleDoctorId + "/");
};

const deleteSomeScheduleDoctor = (scheduleDoctorIds) => {
  return instance.post("/api/deleteschedulerdoctors/", {
    scheduler_doctor_ids: scheduleDoctorIds,
  });
};

const editDoctorInformation = (
  id,
  name,
  phone,
  address,
  years_of_experience,
  birthday,
  gender,
) => {
  return instance.patch(`/api/doctors/${id}/`, {
    name,
    phone,
    address,
    years_of_experience,
    birthday,
    gender,
  });
};
const getBlog = (id, name, id_category, offset) => {
  return instance.get(
    `/api/search_blog/?id_category=${id_category}&name=${name}&id_doctor=${id}&limit=6&offset=${offset}`,
  );
};
const addBlog = (id_category, id_doctor, title, content, picture) => {
  const formData = new FormData();
  formData.append("id_category", id_category);
  formData.append("id_doctor", id_doctor);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("picture", picture);
  return instance.post("/api/blogcruds/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteBlog = (id_blog, id_category, id_doctor, title, content) => {
  return instance.delete(`/api/blogcruds/${id_blog}/`, {
    id_category,
    id_doctor,
    title,
    content,
  });
};
const editBlog = (id_blog, id_category, id_doctor, title, content, picture) => {
  const formData = new FormData();
  formData.append("id_category", id_category);
  formData.append("id_doctor", id_doctor);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("picture", picture);
  return instance.patch(`/api/blogcruds/${id_blog}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const addSpecialty = (specialty_id, doctor_id) => {
  return instance.post("/api/specialtydoctor/", { specialty_id, doctor_id });
};
const deleteSpecialtyDoctor = (specialtyDoctorId) => {
  return instance.delete("/api/specialtydoctor/" + specialtyDoctorId + "/");
};
const deleteSomeSpecialtyDoctor = (SpecialtyDoctorIds) => {
  return instance.post("api/deletespecialtydoctors/", {
    specialty_doctor_ids: SpecialtyDoctorIds,
  });
};
const getSpecialtyByName = (name, id_doctor) => {
  return instance.get(
    `/api/search_specialty666/?name=${name}&id_doctor=${id_doctor}`,
  );
};
const getSpecialtyByDoctorId = (id_doctor, offset) => {
  return instance.get(
    `/api/specialtydoctor/?doctor=${id_doctor}&limit=4&offset=${offset}`,
  );
};
const getServiceByName = (name, id_doctor) => {
  return instance.get(
    `/api/search_service666/?name=${name}&id_doctor=${id_doctor}`,
  );
};
const getServiceByDoctorId = (id_doctor, offset) => {
  return instance.get(
    `/api/servicedoctors/?doctor=${id_doctor}&limit=4&offset=${offset}`,
  );
};
const deleteSomeServiceDoctor = (ServiceDoctorIds) => {
  return instance.post("api/deleteservicedoctors/", {
    service_doctor_ids: ServiceDoctorIds,
  });
};
const addService = (service_id, doctor_id) => {
  return instance.post("/api/servicedoctors/", { service_id, doctor_id });
};
const getDoctorAppoinment = (id, offset) => {
  return instance.get(
    `/api/appointments/?doctor_id=${id}&limit=6&offset=${offset}`,
  );
};
const editUsername = (username, email, id) => {
  return instance.patch(`/api/accounts/${id}/`, { username, email });
};
export {
  editDoctorInformation,
  getBlog,
  addBlog,
  deleteBlog,
  editBlog,
  fetchAllSchedule,
  fetchAllScheduleByDoctorId,
  addScheduleDoctor,
  addSomeScheduleDoctor,
  deleteScheduleDoctor,
  deleteSomeScheduleDoctor,
  addSpecialty,
  getSpecialtyByName,
  getServiceByName,
  addService,
  getDoctorAppoinment,
  deleteSpecialtyDoctor,
  deleteSomeSpecialtyDoctor,
  getSpecialtyByDoctorId,
  getServiceByDoctorId,
  deleteSomeServiceDoctor,
  editUsername,
};
