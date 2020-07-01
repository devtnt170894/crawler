const db = require("../models");
const News = db.news;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const newsData = {
    maTin: req.body.maTin,
    title: req.body.title,
    url: req.body.url,
    loaiChoThue: req.body.loaiChoThue,
    dienTich: req.body.dienTich,
    gia: req.body.gia,
    soPhongNgu: req.body.soPhongNgu,
    noiDungDang : req.body.noiDungDang,
    tenLienHe : req.body.tenLienHe,
    sdtLienHe : req.body.sdtLienHe,
    khuVuc: req.body.khuVuc,
    diaChi: req.body.diaChi,
    ngayDang: req.body.ngayDang,
    ngayHetHan: req.body.ngayHetHan
  };

  // Save News in the database
  News.create(newsData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the News."
      });
    });
};
exports.findAll = (req, res) => {
  News.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.findAllByID = (req, res) => {
  const whereID = {
      maTin:req.params.maTin
  }
  News.findOne({where : whereID })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
