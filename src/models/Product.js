export default class Product {

  constructor (idPr, namePr,typePr,pricePr,descriptionPr,imagePr){
    this.idPr = idPr;
    this.namePr = namePr;
    this.typePr = typePr;
    this.pricePr = pricePr;
    this.descriptionPr = descriptionPr;
    this.imagePr = Array.isArray(imagePr) ? imagePr : [imagePr];// kiểm tra xem image phải là một mảng k
}
setIdPr (idPr){
    this.idPr = idPr;
}
getIdPr(){
    return this.idPr;
}
setNamePr (namePr){
    this.namePr = namePr;
}
getNamePr(){
    return this.namePr;
}
setTypePr (typePr){
    this.typePr = typePr;
}
getTypePr(){
    return this.typePr;
}
setPricePr (pricePr){
    this.pricePr = pricePr;
}
getPricePr(){
    return this.pricePr;
}
setDescriptionPr (descriptionPr){
    this.descriptionPr = descriptionPr;
}
getDescriptionPr(){
    return this.descriptionPr;
}
setImagePr (imagePr){
    this.imagePr = imagePr;
}
getImagePr(){
    return this.imagePr;
}
  }