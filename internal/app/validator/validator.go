package validator

import (
	"net"
	"regexp"
	"unicode"

	"github.com/go-playground/validator/v10"
)

// CustomValidator 自定义验证器
type CustomValidator struct {
	validator *validator.Validate
}

// New 创建新的验证器
func New() *CustomValidator {
	v := validator.New()
	
	// 注册自定义验证规则
	v.RegisterValidation("password_strength", validatePasswordStrength)
	v.RegisterValidation("username", validateUsername)
	v.RegisterValidation("phone", validatePhone)
	
	return &CustomValidator{
		validator: v,
	}
}

// Validate 验证结构体
func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

// validatePasswordStrength 密码强度验证
func validatePasswordStrength(fl validator.FieldLevel) bool {
	password := fl.Field().String()
	
	if len(password) < 8 {
		return false
	}
	
	hasUpper := false
	hasLower := false
	hasDigit := false
	hasSpecial := false
	
	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsDigit(char):
			hasDigit = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}
	
	return hasUpper && hasLower && hasDigit && hasSpecial
}

// validateUsername 用户名验证
func validateUsername(fl validator.FieldLevel) bool {
	username := fl.Field().String()
	
	if len(username) < 3 || len(username) > 20 {
		return false
	}
	
	// 只允许字母、数字和下划线
	matched, _ := regexp.MatchString(`^[a-zA-Z0-9_]+$`, username)
	return matched
}

// validatePhone 手机号验证（中国大陆）
func validatePhone(fl validator.FieldLevel) bool {
	phone := fl.Field().String()
	
	matched, _ := regexp.MatchString(`^1[3-9]\d{9}$`, phone)
	return matched
}

// ValidateIP 验证 IP 地址
func ValidateIP(ip string) bool {
	return net.ParseIP(ip) != nil
}

// ValidateEmailFormat 验证邮箱格式
func ValidateEmailFormat(email string) bool {
	matched, _ := regexp.MatchString(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`, email)
	return matched
}
