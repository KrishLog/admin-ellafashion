CREATE TABLE ELLA_PRODUCT (
  ID BIGINT NOT NULL AUTO_INCREMENT,
  TITLE VARCHAR(75) NOT NULL,
  SUMMARY TINYTEXT NULL, 
  CREATEDDATE DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UPDATEDDATE DATETIME NULL DEFAULT NULL, 
  PRIMARY KEY (ID) 
);

CREATE TABLE  ELLA_SIZE (
  ID BIGINT NOT NULL AUTO_INCREMENT,
  TITLE VARCHAR(75) NOT NULL,
  SUMMARY TINYTEXT NULL,
  PRIMARY KEY (ID) 
);
CREATE TABLE  ELLA_BRAND (
  ID BIGINT NOT NULL AUTO_INCREMENT,
  TITLE VARCHAR(75) NOT NULL,
  SUMMARY TINYTEXT NULL,
  PRIMARY KEY (ID) 
);