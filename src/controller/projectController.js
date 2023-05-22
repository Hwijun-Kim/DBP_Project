const { Request, Response, NextFunction } = require("express");
const { projectService } = require("../service");

const getAllProjects = async (req, res) => {
  const projects = await projectService.getAllProjects();
  if (!projects) {
    return res
      .status(404)
      .json({ status: 404, message: "진행 중인 프로젝트가 없습니다." });
  }
  return res
    .status(200)
    .json({ status: 200, message: "전체 프로젝트 조회 성공", projects });
};

const searchProjects = async (req, res) => {
  const { p_id, p_name, start_date, end_date, client } = req.query;

  const searchProjects = await projectService.searchProjects(
    p_id,
    p_name,
    start_date,
    end_date,
    client
  );

  return res
    .status(200)
    .json({ status: 200, message: "프로젝트 검색 성공", searchProjects });
};

const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  const result = await projectService.getProjectById(projectId);

  if (!result) {
    return res
      .status(404)
      .json({ status: 404, message: "해당 프로젝트가 존재하지 않습니다." });
  }

  return res
    .status(200)
    .json({ status: 200, message: "프로젝트 조회 성공", result });
};

module.exports = {
  getAllProjects,
  searchProjects,
  getProjectById,
};
