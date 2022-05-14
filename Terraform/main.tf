
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



# resource "aws_rds_cluster" "food-blog-cluster" {
#   cluster_identifier        = "food-blog-cluster"

# }

# resource "aws_rds_cluster_instance" "food-blog-cluster-instance" { 

#    instance_class            = "db.serverless"
#    cluster_identifier        = aws_rds_cluster.food-blog-cluster.id


# }

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

  lifecycle {
    ignore_changes = [
        master_password,
      allocated_storage,
      allow_major_version_upgrade,
      apply_immediately,
      arn,
      availability_zones,
backtrack_window,
cluster_identifier_prefix,
cluster_members,
cluster_resource_id,
copy_tags_to_snapshot,
db_cluster_instance_class,
db_cluster_parameter_group_name,
db_instance_parameter_group_name,
deletion_protection,
enable_global_write_forwarding,
enabled_cloudwatch_logs_exports,
endpoint,
engine_version_actual,
final_snapshot_identifier,
global_cluster_identifier ,
hosted_zone_id ,
iam_database_authentication_enabled ,
iam_roles ,
id ,
iops ,
kms_key_id ,
preferred_backup_window ,
preferred_maintenance_window ,
reader_endpoint ,
replication_source_identifier ,
restore_to_point_in_time ,
s3_import ,
snapshot_identifier ,
source_region ,
storage_encrypted ,
storage_type ,
tags ,
tags_all ,
timeouts ,
enable_http_endpoint,
id

    ]
  }

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

  lifecycle  {
    ignore_changes = all
  }
}






resource "aws_ecr_repository" "foodblog-repo" {
  name                 = "foodblog_repo"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_s3_bucket" "foodblog-avatar" {
  bucket = "foodblog-avatar"

}


resource "aws_s3_bucket_policy" "foodblog-avatar-bucket-policy" {
  bucket = aws_s3_bucket.foodblog-avatar.id
  policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
        {
              "Action": [
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:GetObjectAttributes",
                "s3:PutObject"
              ],
              "Effect": "Allow",
              "Resource": "${aws_s3_bucket.foodblog-avatar.arn}/*",
              "Principal": "*"
        }
      ]
    }
  POLICY
}

resource "aws_s3_bucket_acl" "foodblog-avatar-bucket-acl" {
  bucket = aws_s3_bucket.foodblog-avatar.id
  acl    = "public-read-write"
}



# resource "aws_iam_role" "ecsTaskExecutionRole" {
#   name               = "ecsTaskExecutionRole"
#   assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
# }

# data "aws_iam_policy_document" "assume_role_policy" {
#   statement {
#     actions = ["sts:AssumeRole"]

#     principals {
#       type        = "Service"
#       identifiers = ["ecs-tasks.amazonaws.com"]
#     }
#   }
# }

# resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
#   role       = aws_iam_role.ecsTaskExecutionRole.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
# }





# resource "aws_ecs_cluster" "aws-ecs-cluster" {
#   name = "foodblog-cluster"
#   tags = {
#     Name        = "foodblog-ecs"
#   }
# }





# resource "aws_cloudwatch_log_group" "log-group" {
#   name = "foodblog-logs"

#   tags = {
#     Application = "foodblog"
#   }
# }







# resource "aws_ecs_task_definition" "aws-ecs-task" {
#   family = "foodblog-task"

#   container_definitions = <<DEFINITION
#   [
#     {
#       "name": "${var.container_name}",
#       "image": "${aws_ecr_repository.foodblog-repo.repository_url}:latest",
#       "entryPoint": [],
#       "essential": true,
#       "logConfiguration": {
#         "logDriver": "awslogs",
#         "options": {
#           "awslogs-group": "${aws_cloudwatch_log_group.log-group.id}",
#           "awslogs-region": "${var.aws_region}",
#           "awslogs-stream-prefix": "foodblog-log"
#         }
#       },
#       "portMappings": [
#         {
#           "containerPort": 8080,
#           "hostPort": 8080
#         }
#       ],
#       "cpu": 256,
#       "memory": 512,
#       "networkMode": "awsvpc"
#     }
#   ]
#   DEFINITION

#   requires_compatibilities = ["FARGATE"]
#   network_mode             = "awsvpc"
#   memory                   = "512"
#   cpu                      = "256"
#   execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
#   task_role_arn            = aws_iam_role.ecsTaskExecutionRole.arn

#   tags = {
#     Name        = "foodblog-ecs-td"
#   }
# }


