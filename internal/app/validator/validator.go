package validator

import (
	"fmt"
	"net"
	"regexp"
	"unicode"

	"github.com/go-playground/validator/v10"
)

// CustomValidator custom validator
type CustomValidator struct {
	validator *validator.Validate
}

// New create new validator
func New() *CustomValidator {
	v := validator.New()

	// Register custom validation rules
	if err := v.RegisterValidation("password_strength", validatePasswordStrength); err != nil {
		panic(fmt.Sprintf("failed to register password_strength validation: %v", err))
	}
	if err := v.RegisterValidation("username", validateUsername); err != nil {
		panic(fmt.Sprintf("failed to register username validation: %v", err))
	}
	if err := v.RegisterValidation("phone", validatePhone); err != nil {
		panic(fmt.Sprintf("failed to register phone validation: %v", err))
	}

	return &CustomValidator{
		validator: v,
	}
}

// Validate validate struct
func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

// validatePasswordStrength password strength validation
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

// validateUsername username validation
func validateUsername(fl validator.FieldLevel) bool {
	username := fl.Field().String()

	if len(username) < 3 || len(username) > 20 {
		return false
	}

	// Only allow letters, numbers and underscores
	matched, _ := regexp.MatchString(`^[a-zA-Z0-9_]+$`, username)
	return matched
}

// validatePhone phone number validation (Mainland China)
func validatePhone(fl validator.FieldLevel) bool {
	phone := fl.Field().String()

	matched, _ := regexp.MatchString(`^1[3-9]\d{9}$`, phone)
	return matched
}

// ValidateIP validate IP address
func ValidateIP(ip string) bool {
	return net.ParseIP(ip) != nil
}

// ValidateEmailFormat validate email format
func ValidateEmailFormat(email string) bool {
	matched, _ := regexp.MatchString(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`, email)
	return matched
}
