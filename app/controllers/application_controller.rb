class ApplicationController < ActionController::Base
  include Slimmer::GovukComponents

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery except: :service_sign_in_options

  def show_tasklist_header?
    if defined?(should_show_tasklist_header?)
      should_show_tasklist_header?
    end
  end
  helper_method :show_tasklist_header?

  def show_tasklist_sidebar?
    if defined?(should_show_tasklist_sidebar?)
      should_show_tasklist_sidebar?
    end
  end
  helper_method :show_tasklist_sidebar?

  def configure_current_task(config)
    tasklist = config[:tasklist]

    config[:tasklist] = set_task_as_active_if_current_page(tasklist)

    config
  end

private

  def set_task_as_active_if_current_page(tasklist)
    counter = 0
    tasklist[:groups].each do |grouped_steps|
      grouped_steps.each do |step|
        counter = counter + 1

        step[:panel_links].each do |link|
          if link[:href] == request.path
            link[:active] = true
            tasklist[:open_step] = counter
            return tasklist
          end
        end
      end
    end
    tasklist
  end

  def content_item_path
    path_and_optional_locale = params
                                 .values_at(:path, :locale)
                                 .compact
                                 .join('.')

    '/' + URI.encode(path_and_optional_locale)
  end
end
