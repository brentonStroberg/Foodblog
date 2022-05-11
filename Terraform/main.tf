
provider "aws" {
  region = var.aws_region
}


resource "aws_vpc" "web_vpc" {
    cidr_block            = var.cidr_block
    enable_dns_hostnames  = true
    enable_dns_support    = true
    
    tags = {
        Name = "Web VPC"
    }
}


resource "aws_subnet" "private_subnet" {
    count                 = 2
    vpc_id                = aws_vpc.web_vpc.id
    cidr_block            = cidrsubnet(var.cidr_block, 2, count.index)
    availability_zone     = element(var.availability_zones, count.index)
    
    tags = {
        Name = "Private Subnet ${count.index + 1}"
    }
}


resource "aws_internet_gateway" "web_igw" {
  vpc_id = aws_vpc.web_vpc.id
}

resource "aws_route_table" "public_rt" {
  vpc_id    = aws_vpc.web_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.web_igw.id
  }

  tags = {
    Name = "Public Subnet Route Table"
  }
}

resource "aws_subnet" "public_subnet" {
  count                     = 2
  vpc_id                    = aws_vpc.web_vpc.id
  cidr_block                = cidrsubnet(var.cidr_block, 2, count.index + 2)
  availability_zone         = element(var.availability_zones, count.index)
  map_public_ip_on_launch   = true

  tags = {
    Name = "Public Subnet ${count.index + 1}"
  }
}

resource "aws_route_table_association" "public_subnet_rta" {
  count           = 2
  subnet_id       = aws_subnet.public_subnet.*.id[count.index]
  route_table_id  = aws_route_table.public_rt.id
}



resource "aws_db_subnet_group" "aurora_subnetgroup" {
    name         = "aurora_subnetgroup"
    subnet_ids  = [aws_subnet.public_subnet[0].id,aws_subnet.public_subnet[1].id]
}


resource "aws_security_group" "aurora_sg" {
  name          = "aurora_sg"
  description   = "security group for aurora serverless"
  vpc_id        = aws_vpc.web_vpc.id
  
   ingress {
    from_port        = 3306
    to_port          = 3306
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }


  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

}


resource "aws_rds_cluster" "food-blog-cluster" {
  cluster_identifier        = "food-blog-cluster"
  availability_zones        = var.availability_zones
  backup_retention_period   = 1
  deletion_protection       = false
  db_subnet_group_name      = aws_db_subnet_group.aurora_subnetgroup.id
  enable_http_endpoint      = true  
  engine                    = "aurora-mysql"
  engine_mode               = "provisioned"
  engine_version            = "8.0.mysql_aurora.3.02.0"
  database_name             = "foodblog"
  master_username           = "admin"
  master_password           = "foodblog"
  port                      = 3306
  skip_final_snapshot       = true
  vpc_security_group_ids    = [aws_security_group.aurora_sg.id]

  serverlessv2_scaling_configuration {
      max_capacity = 2
      min_capacity =  1
  }
}


resource "aws_rds_cluster_instance" "food-blog-cluster-instance" {
  identifier                = "food-blog-cluster-instance-1"
  cluster_identifier        = aws_rds_cluster.food-blog-cluster.id
  instance_class            = "db.serverless"
  engine                    = aws_rds_cluster.food-blog-cluster.engine
  engine_version            = aws_rds_cluster.food-blog-cluster.engine_version
  db_subnet_group_name      = aws_db_subnet_group.aurora_subnetgroup.id
  publicly_accessible       = true
}

# resource "aws_rds_cluster" "Foodblog-cluster" {
#   cluster_identifier                  = "food-blog"
#   engine                              = "aurora-mysql"
#   engine_version                      = "5.7.12"
#   engine_mode                         = "serverless"
#   database_name                       = "foodblog"
#   master_username                     = "admin"
#   master_password                     = "foodblog"
#   port                                = 3306
#   availability_zones                  = var.availability_zones
#   db_subnet_group_name                = aws_db_subnet_group.aurora_subnetgroup.id

#   vpc_security_group_ids              = [aws_security_group.aurora_sg.id]
  
#   skip_final_snapshot                 = true
#   enable_http_endpoint                = true  
#   backup_retention_period = 0

#   db_cluster_instance_class = "db.t4g.micro"

  
#   scaling_configuration {
#     auto_pause               = true
#     min_capacity             = 1    
#     max_capacity             = 2
#     seconds_until_auto_pause = 1000
#     timeout_action           = "ForceApplyCapacityChange"
#   }  
# }

