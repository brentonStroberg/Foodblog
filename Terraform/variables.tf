variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "us-east-1"
}

# Example of a list variable
variable "availability_zones" {
  default = ["us-east-1a", "us-east-1b"]
}

variable "cidr_block" {
  default = "10.1.0.0/16"
}

variable "env" {
  description = "Targeted Deployment environment"
  default     = "Development"
}

variable "webapp_project_repository_branch" {
  description = "project repo branch"
  default     = "master"
}


variable "container_port" {
  description = "webapp container port"
  default     = 8080
}

variable "ACCOUNT_ID" {
    default = 978251882572
}

variable "vpc_default_id" {
  default = "vpc-01e72913aab052883"
}

variable "container_name" {
  default = "foodblog"
}