class User < ApplicationRecord
  VALIDATE_ADDRESS_REGEX=/\A0x[a-fA-F0-9]{40}\Z/i
  validates :address, presence: true, format: { with: VALIDATE_ADDRESS_REGEX }, uniqueness: { case_sensitive: false }
end
