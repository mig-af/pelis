package security

import (
	"crypto/rand"
	"encoding/hex"
	"crypto/sha256"
)





func GenerateRefreshToken()string{
	return rand.Text()
}

func HashRefreshToken(token string)string{
	hash := sha256.Sum256([]byte(token))
	return hex.EncodeToString(hash[:])
}

