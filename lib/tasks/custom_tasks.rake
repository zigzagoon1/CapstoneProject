namespace :db do
    task :clear_storage => :environment do
        puts "Clearing storage..."
        FileUtils.rm_rf(Rails.root.join('storage', '*'))
    end

    task reset: :clear_storage

end