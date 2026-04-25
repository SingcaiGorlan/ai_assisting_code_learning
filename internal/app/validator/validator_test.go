package validator

import "testing"

type passwordCase struct {
	Password string `validate:"password_strength"`
}

type usernameCase struct {
	Username string `validate:"username"`
}

type phoneCase struct {
	Phone string `validate:"phone"`
}

func TestPasswordStrengthRule(t *testing.T) {
	v := New()
	if err := v.Validate(passwordCase{Password: "Aa1!abcd"}); err != nil {
		t.Fatalf("expected strong password to pass, got %v", err)
	}
	if err := v.Validate(passwordCase{Password: "weak"}); err == nil {
		t.Fatalf("expected weak password to fail")
	}
}

func TestUsernameRule(t *testing.T) {
	v := New()
	if err := v.Validate(usernameCase{Username: "ab"}); err == nil {
		t.Fatalf("too short username should fail")
	}
	if err := v.Validate(usernameCase{Username: "valid_name"}); err != nil {
		t.Fatalf("valid username should pass, got %v", err)
	}
}

func TestPhoneRule(t *testing.T) {
	v := New()
	if err := v.Validate(phoneCase{Phone: "13812345678"}); err != nil {
		t.Fatalf("valid phone should pass, got %v", err)
	}
	if err := v.Validate(phoneCase{Phone: "12800000000"}); err == nil {
		t.Fatalf("invalid phone should fail")
	}
}

func TestValidateIPAndEmail(t *testing.T) {
	if !ValidateIP("127.0.0.1") || ValidateIP("999.0.0.1") {
		t.Fatalf("ip validation failed")
	}
	if !ValidateEmailFormat("user@example.com") || ValidateEmailFormat("bad@com") {
		t.Fatalf("email validation failed")
	}
}
