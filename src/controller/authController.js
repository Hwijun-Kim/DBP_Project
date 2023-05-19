const { Request, Response, NextFunction } = require("express");
const { authService } = require("../service");


// 아이디 중복 확인
const checkUser = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id )
    return res.status(400).json({ status: 400, success: false, message: "아이디를 입력해주세요." });

  const check = await authService.checkUser(user_id);
  console.log(check)
  if (check)
    return res.status(400).json({ status: 400, success: false, message: "이미 중복되는 아이디가 존재합니다." });

  return res.status(200).json({ status: 200, success: true, message: "사용 가능한 아이디입니다." });
};

// 회원가입(DB저장)
const signupUser = async (req, res) => {
  const { user_num, user_id, password } = req.body;
  if (!user_num || !user_id || !password)
    return res.status(400).json({ status: 404, message: "모든 값을 입력해주세요." });

  const check = await authService.signupUser(user_num, user_id, password);
  try {
    if (check){
      return res.status(200).json({ status: 200, success: true, message: "회원가입 성공" });}
  } catch {
      return res.status(500).json({ status: 500, success: false, message: "회원가입 실패" });}
};

module.exports = { checkUser,signupUser };


