module ApplicationHelper
  DAY_SECONDS = 86400
  HOUR_SECONDS = 3600
  def calculate_date_from_now(time)
    now_int = Time.now.to_i
    time_int = time.to_i

    diff_day = (now_int - time_int) / DAY_SECONDS
    diff_hour = (now_int - time_int - DAY_SECONDS * diff_day) / HOUR_SECONDS
    diff_minutes = (now_int - time_int - DAY_SECONDS * diff_day - HOUR_SECONDS * diff_hour) / 60

    return [diff_day, diff_hour, diff_minutes]
  end
end
