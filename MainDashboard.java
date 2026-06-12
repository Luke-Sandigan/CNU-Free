import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class MainDashboard extends JFrame {

    private List<Friend> myFriends; 
    private JPanel contentPanel;
    private String currentDay = "M"; 

    public MainDashboard() {
        myFriends = DataManager.loadData(); 
        if (myFriends == null) {
            myFriends = new ArrayList<>();
        }

        setTitle("Cnu Free? - Schedule Checker");
        setSize(400, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        JPanel headerPanel = new JPanel();
        headerPanel.setBackground(new Color(50, 50, 50));
        JLabel titleLabel = new JLabel("Cnu Free?");
        titleLabel.setForeground(Color.WHITE);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        headerPanel.add(titleLabel);

        JPanel filterPanel = new JPanel();
        String[] days = {"M", "T", "W", "TH", "F", "S"};
        ButtonGroup dayGroup = new ButtonGroup();
        
        for (String day : days) {
            JToggleButton btn = new JToggleButton(day);
            if (day.equals("M")) btn.setSelected(true);
            
            btn.addActionListener(e -> {
                currentDay = btn.getText();
                refreshFriendList();
            });
            
            dayGroup.add(btn);
            filterPanel.add(btn);
        }

        contentPanel = new JPanel();
        contentPanel.setLayout(new BoxLayout(contentPanel, BoxLayout.Y_AXIS));
        JScrollPane scrollPane = new JScrollPane(contentPanel);
        scrollPane.setBorder(null);

        JPanel navPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        JButton btnFriends = new JButton("Friends List"); 
        JButton btnAdd = new JButton("+");
        
        btnFriends.addActionListener(e -> {
            if (myFriends.isEmpty()) {
                JOptionPane.showMessageDialog(this, "You haven't added any friends yet!");
            } else {
                new FriendsListDialog(this, myFriends).setVisible(true);
            }
        });

        btnAdd.addActionListener(e -> {
            AddFriendDialog dialog = new AddFriendDialog(this);
            dialog.setVisible(true);

            if (dialog.isSucceeded()) {
                Friend newFriend = dialog.getNewFriend();
                
                boolean exists = false;
                for (Friend f : myFriends) {
                    if (f.getName().equalsIgnoreCase(newFriend.getName())) {
                        exists = true;
                        break;
                    }
                }

                if (exists) {
                    JOptionPane.showMessageDialog(this, 
                        "Friend '" + newFriend.getName() + "' already exists.\nPlease use the 'Friends List' -> 'Edit' button to modify their schedule.", 
                        "Duplicate Error", 
                        JOptionPane.WARNING_MESSAGE);
                } else {
                    myFriends.add(newFriend); 
                    DataManager.saveData(myFriends);
                    JOptionPane.showMessageDialog(this, "Success! Saved friend: " + newFriend.getName());
                    refreshFriendList(); 
                }
            }
        });

        navPanel.add(btnFriends);
        navPanel.add(btnAdd);

        JPanel topContainer = new JPanel(new BorderLayout());
        topContainer.add(headerPanel, BorderLayout.NORTH);
        topContainer.add(filterPanel, BorderLayout.CENTER);
        
        add(topContainer, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);
        add(navPanel, BorderLayout.SOUTH);

        setVisible(true);
        refreshFriendList();
    }

    public void refreshFriendList() {  
        contentPanel.removeAll();
        for (Friend f : myFriends) {
            FriendCard card = new FriendCard(f, currentDay);
            contentPanel.add(Box.createVerticalStrut(10)); 
            contentPanel.add(card);
        }
        contentPanel.revalidate();
        contentPanel.repaint();
    }
}