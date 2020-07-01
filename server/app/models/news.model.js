module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    id:{
      type: Sequelize.INTEGER, 
      autoIncrement: true,
      primaryKey: true
    },
    maTin: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    loaiChoThue: {
      type: Sequelize.STRING
    },
    dienTich: {
      type: Sequelize.STRING
    },
    gia: {
      type: Sequelize.STRING
    },
    soPhongNgu: {
      type: Sequelize.STRING
    },
    khuVuc: {
      type: Sequelize.STRING
    },
    diaChi: {
      type: Sequelize.STRING
    },
    tenLienHe: {
      type: Sequelize.STRING
    },
    sdtLienHe: {
      type: Sequelize.STRING
    },
    noiDungDang:{
      type: Sequelize.TEXT
    },
    ngayDang: {
      type: Sequelize.STRING
    },
    ngayHetHan: {
      type: Sequelize.STRING
    }
  });

  return News;
};