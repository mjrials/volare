class CreateRewards < ActiveRecord::Migration
  def change
    create_table :rewards do |t|
    	t.column :flier_id,		:integer
    	t.column :airline, 		:string
    	t.column :t_miles,		:integer
    	t.column :r_miles,		:integer
    	t.column :eqm,			  :integer
    	t.column :status,		  :string
      t.timestamps
    end
  end
end
